import express from "express";
import { createServer as createViteServer } from "vite";
import twilio from "twilio";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/notify-login", async (req, res) => {
    const { email } = req.body;
    try {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const fromPhone = process.env.TWILIO_PHONE_NUMBER;
      const toPhone = "+919334204813";

      if (accountSid && authToken && fromPhone) {
        const client = twilio(accountSid, authToken);
        await client.messages.create({
          body: `Admin login detected on Urmila ITI website by: ${email}`,
          from: fromPhone,
          to: toPhone
        });
        console.log("SMS notification sent successfully.");
      } else {
        console.log("Twilio credentials not configured. Skipping SMS.");
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error sending SMS:", error);
      res.status(500).json({ success: false, error: "Failed to send SMS" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
