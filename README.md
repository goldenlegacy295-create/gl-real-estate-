# Golden Legacy Real Estate

Golden Legacy is an enterprise-grade luxury real estate platform built for sovereign wealth portfolios, ultra-high-net-worth (UHNW) investors, and elite property acquisitions in Dubai.

## 🏗 Architecture
This application is built with:
- **Frontend**: React 19, Vite, Tailwind CSS, GSAP Animations, Lucide Icons
- **Backend/SSR**: Express.js with custom Server-Side Meta Injection for dynamic SEO routes.
- **Routing**: React Router DOM (v7)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the required keys.

### Development
Start the development server with HMR:
```bash
npm run dev
```

### Production Build
Create a production-ready optimized build:
```bash
npm run build
```

Run the production server:
```bash
npm run start
```

## 🔒 Security & Deployment
This project is configured for edge-ready deployment on Vercel.
- **Security**: Includes strict HTTP headers (`X-Frame-Options`, `Content-Security-Policy`, `HSTS`).
- **SEO**: Dynamic JSON-LD structured data generation, dynamic `<title>` and `<meta>` tags via Express route interception, and automatic `sitemap.xml` / `robots.txt` generation.
- **Performance**: Optimized Vite manual chunking to ensure JavaScript bundles remain small and performant.

## 📄 License
Private and Confidential. © 2026 Golden Legacy Real Estate. All rights reserved.
