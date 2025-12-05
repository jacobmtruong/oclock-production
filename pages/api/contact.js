import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email and message are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Gmail requires true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const toAddress = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"O'CLOCK website Contact" <${process.env.SMTP_USER}>`,
      to: toAddress,
      replyTo: email,
      subject: subject || `New message from ${name}`,
      text: `
New contact message:

Name: ${name}
Email: ${email}
Subject: ${subject || "(no subject)"}

Message:
${message}
      `,
      html: `
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "(no subject)"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("CONTACT_API_ERROR:", err);
    return res
      .status(500)
      .json({ message: "Failed to send message. Please try again later." });
  }
}
