import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { PROPERTIES, DEVELOPERS, COMMUNITIES, BLOGS } from "./src/data";
import { generatePropertySchema, generateDeveloperSchema, generateCommunitySchema, generateGlobalSchema } from "./src/utils/seo";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// In-memory store for leads submitted via forms, so Admin CRM is fully active in real-time
let leadsStore = [
  {
    id: "lead-initial-1",
    name: "Sir Alistair Sterling",
    email: "sterling@wealthholding.com",
    phone: "+44 7911 123456",
    message: "Interested in the Frond G Royal Mansion Villa. Looking for a private cash purchase.",
    propertyId: "prop-1",
    type: "Viewing",
    status: "New",
    date: new Date(Date.now() - 3600000 * 2).toISOString().slice(0, 10)
  },
  {
    id: "lead-initial-2",
    name: "Dr. Amara Patel",
    email: "amara.patel@healthcorp.ae",
    phone: "+971 50 987 6543",
    message: "Requesting detailed investment dossier on Crestmark Sanctuary for capital growth optimization.",
    propertyId: "prop-5",
    type: "Brochure",
    status: "Contacted",
    date: new Date(Date.now() - 3600000 * 24).toISOString().slice(0, 10)
  }
];

// AI Client removed for production optimization
// REST API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
});

// Submit a new lead with validation
app.post("/api/leads", (req, res) => {
  let { name, email, phone, message, propertyId, type } = req.body;
  
  // Basic sanitization and trimming
  name = typeof name === 'string' ? name.trim() : '';
  email = typeof email === 'string' ? email.trim() : '';
  phone = typeof phone === 'string' ? phone.trim() : '';
  message = typeof message === 'string' ? message.trim() : '';
  
  if (!name || name.length > 100) {
    return res.status(400).json({ error: "Valid name is required." });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 150) {
    return res.status(400).json({ error: "Valid email is required." });
  }

  if (message && message.length > 2000) {
    return res.status(400).json({ error: "Message exceeds maximum length." });
  }

  const newLead = {
    id: `lead-${Date.now()}`,
    name,
    email,
    phone: phone.substring(0, 50),
    message,
    propertyId: propertyId || undefined,
    type: type || "Consultation",
    status: "New" as const,
    date: new Date().toISOString().slice(0, 10)
  };

  leadsStore.unshift(newLead);
  res.status(201).json({ success: true, lead: newLead });
});

// List all leads for Admin Dashboard
app.get("/api/leads", (req, res) => {
  res.json({ leads: leadsStore });
});

// Update lead status (Admin Dashboard integration)
app.patch("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const leadIndex = leadsStore.findIndex(l => l.id === id);
  if (leadIndex === -1) {
    return res.status(404).json({ error: "Lead not found." });
  }
  leadsStore[leadIndex].status = status;
  res.json({ success: true, lead: leadsStore[leadIndex] });
});

// AI Concierge proxy removed for production cleanup
// Configure Vite or Static File Serving
async function startServer() {
  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
  }

  // SEO Sitemaps & Robots
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\nSitemap: https://www.goldenlegacy.ae/sitemap.xml`);
  });

  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    const urls = ['/', '/search', '/about', '/blog'];
    PROPERTIES.forEach(p => urls.push(`/property/${p.slug}`));
    DEVELOPERS.forEach(d => urls.push(`/developer/${d.slug}`));
    COMMUNITIES.forEach(c => urls.push(`/community/${c.slug}`));
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.map(url => `
          <url>
            <loc>https://www.goldenlegacy.ae${url}</loc>
            <changefreq>daily</changefreq>
            <priority>${url === '/' ? '1.0' : '0.8'}</priority>
          </url>
        `).join('')}
      </urlset>`;
    res.send(xml);
  });

  // Dynamic Route Intercept for SEO Injection
  app.get('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      let template = '';
      
      if (process.env.NODE_ENV !== "production") {
        template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
      } else {
        template = fs.readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf-8');
      }

      // Default Meta
      let title = "Golden Legacy | Luxury Real Estate Dubai";
      let description = "Discover Dubai's most prestigious properties with trusted family advisors, institutional-grade analytics, and exclusive off-market allocations.";
      let schemaJson = generateGlobalSchema();

      if (url.startsWith('/property/')) {
        const slug = url.split('/property/')[1].split('?')[0];
        const property = PROPERTIES.find(p => p.slug === slug);
        if (property) {
          title = property.seoTitle || property.title;
          description = property.seoDescription || property.description;
          schemaJson = generatePropertySchema(property);
        }
      } else if (url.startsWith('/developer/')) {
        const slug = url.split('/developer/')[1].split('?')[0];
        const dev = DEVELOPERS.find(d => d.slug === slug);
        if (dev) {
          title = dev.seoTitle || dev.name;
          description = dev.seoDescription || dev.description;
          schemaJson = generateDeveloperSchema(dev);
        }
      } else if (url.startsWith('/community/')) {
        const slug = url.split('/community/')[1].split('?')[0];
        const comm = COMMUNITIES.find(c => c.slug === slug);
        if (comm) {
          title = comm.seoTitle || comm.name;
          description = comm.seoDescription || comm.description;
          schemaJson = generateCommunitySchema(comm);
        }
      }

      // Strip existing title to prevent duplicates
      template = template.replace(/<title>.*?<\/title>/gi, '');

      const headInjection = `
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta name="twitter:card" content="summary_large_image">
        <link rel="canonical" href="https://www.goldenlegacy.ae${url.split('?')[0]}">
        <script type="application/ld+json">${schemaJson}</script>
      `;

      const html = template.replace('</head>', `${headInjection}</head>`);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      if (process.env.NODE_ENV !== "production" && vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  const portToUse = process.env.PORT ? parseInt(process.env.PORT, 10) : 0;
  const server = app.listen(portToUse, "0.0.0.0", () => {
    const address = server.address() as any;
    console.log(`Golden Legacy server online on http://localhost:${address.port}`);
  });
}

startServer();
