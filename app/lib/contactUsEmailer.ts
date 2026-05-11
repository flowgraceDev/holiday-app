import nodemailer from "nodemailer";

type ContactEmailData = {
  full_name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  arrival_date?: string | null;
  departure_date?: string | null;
  message: string;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_PASS!,
  },
});

const row = (label: string, value?: string | number | null) => `
  <tr>
    <td style="padding:12px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:600;width:220px;">
      ${label}
    </td>
    <td style="padding:12px;border:1px solid #e5e7eb;">
      ${value ?? "N/A"}
    </td>
  </tr>
`;

export async function sendContactEmail(data: ContactEmailData) {
  const ownerEmail = process.env.GMAIL_USER!;

  const ownerHTML = `
    <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;padding:24px;color:#0f172a;">
      <h1 style="margin:0 0 8px;font-size:26px;">New Contact Inquiry</h1>

      <table style="width:100%;border-collapse:collapse;margin-top:24px;">
        ${row("Full Name", data.full_name)}
        ${row("Email", data.email)}
        ${row("Phone", data.phone)}
        ${row("Subject", data.subject)}
        ${row("Arrival Date", data.arrival_date)}
        ${row("Departure Date", data.departure_date)}
        ${row("Message", data.message)}
      </table>
    </div>
  `;

  const customerHTML = `
    <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;padding:24px;color:#0f172a;">
      <h1 style="margin-bottom:12px;font-size:28px;">
        Thank you, ${data.full_name} 👋
      </h1>

      <p style="line-height:1.7;color:#475569;">
        We have received your message. Our team will get back to you shortly.
      </p>

      <table style="width:100%;border-collapse:collapse;margin-top:24px;">
        ${row("Subject", data.subject)}
        ${row("Arrival Date", data.arrival_date)}
        ${row("Departure Date", data.departure_date)}
      </table>
    </div>
  `;

  await Promise.all([
    transporter.sendMail({
      from: `"Contact Inquiry" <${ownerEmail}>`,
      to: ownerEmail,
      replyTo: data.email,
      subject: `New Contact - ${data.subject || "General Inquiry"}`,
      html: ownerHTML,
    }),

    transporter.sendMail({
      from: `"Travel Support" <${ownerEmail}>`,
      to: data.email,
      subject: "We received your message",
      html: customerHTML,
    }),
  ]);
}