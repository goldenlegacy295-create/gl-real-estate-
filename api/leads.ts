import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id, date, name, email, phone, type, propertyId, status, message } = req.body;

    const newLead = {
      id: id || Date.now().toString(),
      name: name || "Unknown",
      email: email || "No Email",
      phone: phone || "No Phone",
      type: type || "General Enquiry",
      propertyId: propertyId || "",
      message: message || "",
      status: "New",
      date: date || new Date().toISOString().slice(0, 10)
    };

    // 1. Google Sheets Integration via Apps Script
    const { APPS_SCRIPT_WEB_APP_URL } = process.env;
    if (APPS_SCRIPT_WEB_APP_URL) {
      try {
        const response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead)
        });
        
        if (response.ok) {
          console.log(`Lead ${newLead.id} successfully added to Google Sheets via Apps Script.`);
        } else {
          console.error("Failed to add lead to Google Sheets. Status:", response.status);
        }
      } catch (sheetErr) {
        console.error("Error connecting to Apps Script:", sheetErr);
      }
    } else {
      console.warn("Apps Script Web App URL is missing. Skipping Sheets integration.");
    }

    // 2. Send Email Notification
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL } = process.env;
    if (SMTP_HOST && SMTP_USER && SMTP_PASS && ADMIN_EMAIL) {
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || "465", 10),
          secure: parseInt(SMTP_PORT || "465", 10) === 465,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        const mailOptions = {
          from: `"Golden Legacy Portal" <${SMTP_USER}>`,
          to: ADMIN_EMAIL,
          subject: `New Lead: ${newLead.name} (${newLead.type})`,
          text: `
A new lead has been submitted on the Golden Legacy portal.

Lead Details:
- Date: ${newLead.date}
- Name: ${newLead.name}
- Email: ${newLead.email}
- Phone: ${newLead.phone}
- Enquiry Type: ${newLead.type}
- Property ID: ${newLead.propertyId || 'N/A'}

Message/Requirements:
${newLead.message}
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email notification sent to ${ADMIN_EMAIL} for lead ${newLead.id}`);
      } catch (emailErr) {
        console.error("Error sending email notification:", emailErr);
      }
    } else {
      console.warn("SMTP configuration is missing. Skipping email notification.");
    }

    return res.status(201).json({ success: true, lead: newLead });
  } catch (error) {
    console.error("Server error processing lead:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
