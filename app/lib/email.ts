import nodemailer from "nodemailer";

type InquiryData = {
  name: string;
  email?: string;
  phone: string;
  message?: string;
  service_slug: string;
  extra?: Record<string, string>;
};

export async function sendInquiryEmail(data: InquiryData) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER!,
      pass: process.env.GMAIL_PASS!,
    },
  });

  const extraFieldsHTML = data.extra
    ? Object.entries(data.extra)
        .map(([key, value]) => {
          if (!value) return "";
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());

          return `<p><b>${label}:</b> ${value}</p>`;
        })
        .join("")
    : "";

  const baseHTML = `
    <h2>New Inquiry</h2>

    <p><b>Service:</b> ${data.service_slug}</p>

    <hr />

    <p><b>Name:</b> ${data.name}</p>
    <p><b>Phone:</b> ${data.phone}</p>
    <p><b>Email:</b> ${data.email || "N/A"}</p>

    ${extraFieldsHTML ? `<hr />${extraFieldsHTML}` : ""}

    <hr />

    <p><b>Message:</b><br/>${data.message || "N/A"}</p>
  `;

  // OWNER EMAIL
  await transporter.sendMail({
    from: `"Website Inquiry" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER!,
    subject: `New Inquiry - ${data.service_slug}`,
    replyTo: data.email || undefined,
    html: baseHTML,
  });

  // USER EMAIL (AUTO REPLY)
  if (data.email) {
    await transporter.sendMail({
      from: `"Support Team" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: `Thank you for your inquiry - ${data.service_slug}`,
      html: `
        <h2>Thank You, ${data.name}!</h2>

        <p>We have received your inquiry for <b>${data.service_slug}</b>.</p>

        <p>Our team will get back to you shortly.</p>

        <hr />

        <p><b>Your Submitted Details:</b></p>

        ${baseHTML}

        <hr />

        <p>Regards,<br/>Support Team</p>
      `,
    });
  }
}