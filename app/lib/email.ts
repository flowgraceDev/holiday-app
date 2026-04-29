import nodemailer from "nodemailer";

export async function sendInquiryEmail(data: any) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // 🔥 Dynamic Fields HTML
  const extraFieldsHTML = data.extra
    ? Object.entries(data.extra)
        .map(([key, value]) => {
          if (!value) return ""; // skip empty

          // format key (pickup -> Pickup)
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());

          return `<p><b>${label}:</b> ${value}</p>`;
        })
        .join("")
    : "";

  await transporter.sendMail({
    from: `"Website Inquiry" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,

    subject: `New Inquiry - ${data.service_slug}`,

    replyTo: data.email || undefined,

    html: `
      <h2>New Inquiry</h2>

      <p><b>Service:</b> ${data.service_slug}</p>

      <hr />

      <p><b>Name:</b> ${data.name}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Email:</b> ${data.email || "N/A"}</p>

      ${extraFieldsHTML ? `<hr />${extraFieldsHTML}` : ""}

      <hr />

      <p><b>Message:</b><br/>${data.message || "N/A"}</p>
    `,
  });
}