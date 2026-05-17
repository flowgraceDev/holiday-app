import nodemailer from "nodemailer";

type InquiryData = {
  name: string;
  email?: string;
  phone: string;
  message?: string;
  service_slug: string;
  departureDate?: string;
  arrivalDate?: string;
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

  const formatLabel = (key: string) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

  const extraFieldsHTML = data.extra
    ? Object.entries(data.extra)
        .map(([key, value]) => {
          if (!value) return "";

          return `
            <tr>
              <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;background:#f8fafc;font-weight:600;color:#111827;">
                ${formatLabel(key)}
              </td>

              <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">
                ${value}
              </td>
            </tr>
          `;
        })
        .join("")
    : "";

  const detailsTable = `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="padding:12px 14px;background:#f8fafc;font-weight:600;color:#111827;border-bottom:1px solid #e5e7eb;">
          Full Name
        </td>

        <td style="padding:12px 14px;color:#374151;border-bottom:1px solid #e5e7eb;">
          ${data.name}
        </td>
      </tr>

      <tr>
        <td style="padding:12px 14px;background:#f8fafc;font-weight:600;color:#111827;border-bottom:1px solid #e5e7eb;">
          Phone
        </td>

        <td style="padding:12px 14px;color:#374151;border-bottom:1px solid #e5e7eb;">
          ${data.phone}
        </td>
      </tr>

      <tr>
        <td style="padding:12px 14px;background:#f8fafc;font-weight:600;color:#111827;border-bottom:1px solid #e5e7eb;">
          Email
        </td>

        <td style="padding:12px 14px;color:#374151;border-bottom:1px solid #e5e7eb;">
          ${data.email || "N/A"}
        </td>
      </tr>

      <tr>
        <td style="padding:12px 14px;background:#f8fafc;font-weight:600;color:#111827;border-bottom:1px solid #e5e7eb;">
          Service
        </td>

        <td style="padding:12px 14px;color:#374151;border-bottom:1px solid #e5e7eb;">
          ${data.service_slug}
        </td>
      </tr>

      ${
        data.departureDate
          ? `
            <tr>
              <td style="padding:12px 14px;background:#f8fafc;font-weight:600;color:#111827;border-bottom:1px solid #e5e7eb;">
                Departure Date
              </td>

              <td style="padding:12px 14px;color:#374151;border-bottom:1px solid #e5e7eb;">
                ${data.departureDate}
              </td>
            </tr>
          `
          : ""
      }

      ${
        data.arrivalDate
          ? `
            <tr>
              <td style="padding:12px 14px;background:#f8fafc;font-weight:600;color:#111827;border-bottom:1px solid #e5e7eb;">
                Arrival Date
              </td>

              <td style="padding:12px 14px;color:#374151;border-bottom:1px solid #e5e7eb;">
                ${data.arrivalDate}
              </td>
            </tr>
          `
          : ""
      }

      ${extraFieldsHTML}
    </table>
  `;

  const ownerHTML = `
    <div style="margin:0;padding:40px 20px;background:#f1f5f9;font-family:Arial,sans-serif;">
      <div style="max-width:700px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e5e7eb;">

        <div style="padding:32px;background:#111827;">
          <h1 style="margin:0;color:#ffffff;font-size:28px;">
            New Inquiry Received
          </h1>

          <p style="margin-top:10px;color:#d1d5db;font-size:14px;">
            A new customer inquiry has been submitted from your website.
          </p>
        </div>

        <div style="padding:32px;">
          ${detailsTable}

          <div style="margin-top:28px;">
            <h3 style="margin-bottom:10px;color:#111827;">
              Customer Message
            </h3>

            <div style="padding:18px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;color:#374151;line-height:1.7;">
              ${data.message || "No message provided."}
            </div>
          </div>
        </div>

        <div style="padding:20px;background:#f8fafc;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="margin:0;font-size:13px;color:#6b7280;">
            Website Inquiry Notification
          </p>
        </div>
      </div>
    </div>
  `;

  const clientHTML = `
    <div style="margin:0;padding:40px 20px;background:#f1f5f9;font-family:Arial,sans-serif;">
      <div style="max-width:700px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e5e7eb;">

        <div style="padding:36px;background:linear-gradient(135deg,#111827,#1f2937);text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:30px;">
            Thank You, ${data.name}!
          </h1>

          <p style="margin-top:12px;color:#d1d5db;font-size:15px;">
            Your inquiry has been successfully submitted.
          </p>
        </div>

        <div style="padding:32px;">
          <p style="font-size:16px;color:#374151;line-height:1.8;">
            We’ve received your request regarding
            <b>${data.service_slug}</b>.
            Our support team will review your inquiry and contact you shortly.
          </p>

          <div style="margin-top:28px;">
            <h3 style="margin-bottom:14px;color:#111827;">
              Submitted Details
            </h3>

            ${detailsTable}
          </div>

          ${
            data.message
              ? `
                <div style="margin-top:28px;">
                  <h3 style="margin-bottom:10px;color:#111827;">
                    Your Message
                  </h3>

                  <div style="padding:18px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;color:#374151;line-height:1.7;">
                    ${data.message}
                  </div>
                </div>
              `
              : ""
          }

          <div style="margin-top:30px;padding:18px;background:#ecfeff;border:1px solid #a5f3fc;border-radius:14px;">
            <p style="margin:0;color:#155e75;font-size:14px;line-height:1.7;">
              Our team usually responds within
              <b>24 hours</b>.
            </p>
          </div>
        </div>

        <div style="padding:24px;background:#f8fafc;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="margin:0;color:#6b7280;font-size:13px;">
            Thank you for choosing us ❤️
          </p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Website Inquiry" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER!,
    subject: `New Inquiry - ${data.service_slug}`,
    replyTo: data.email || undefined,
    html: ownerHTML,
  });

  if (data.email) {
    await transporter.sendMail({
      from: `"Support Team" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: `Thank you for your inquiry - ${data.service_slug}`,
      html: clientHTML,
    });
  }
}