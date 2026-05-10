// app/lib/send-trip-inquiry-email.ts

import nodemailer from 'nodemailer'

type TripInquiryData = {
  full_name: string
  email: string
  phone: string
  message?: string | null
  arrival_date?: string | null
  departure_date?: string | null
  number_of_people?: number | null
  trip: {
    id: string
    title: string
    location: string
    starting_city: string
    duration: string
  }
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_PASS!,
  },
})

const row = (label: string, value?: string | number | null) => `
  <tr>
    <td style="padding:12px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:600;width:220px;">
      ${label}
    </td>
    <td style="padding:12px;border:1px solid #e5e7eb;">
      ${value ?? 'N/A'}
    </td>
  </tr>
`

export async function sendTripInquiryEmail(data: TripInquiryData) {
  const ownerEmail = process.env.GMAIL_USER!

  const ownerHTML = `
    <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;padding:24px;color:#0f172a;">
      <h1 style="margin:0 0 8px;font-size:26px;">New Tour Inquiry</h1>

      <table style="width:100%;border-collapse:collapse;margin-top:24px;">
        ${row('Trip', data.trip.title)}
        ${row('Location', data.trip.location)}
        ${row('Starting City', data.trip.starting_city)}
        ${row('Duration', data.trip.duration)}
        ${row('Full Name', data.full_name)}
        ${row('Email', data.email)}
        ${row('Phone', data.phone)}
        ${row('Arrival Date', data.arrival_date)}
        ${row('Departure Date', data.departure_date)}
        ${row('Number Of People', data.number_of_people)}
        ${row('Message', data.message)}
      </table>
    </div>
  `

  const customerHTML = `
    <div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;padding:24px;color:#0f172a;">
      <h1 style="margin-bottom:12px;font-size:28px;">
        Thank you, ${data.full_name} 👋
      </h1>

      <p style="line-height:1.7;color:#475569;">
        Your request for <strong>${data.trip.title}</strong> has been received.
        Our travel expert will contact you shortly with details and availability.
      </p>

      <table style="width:100%;border-collapse:collapse;margin-top:24px;">
        ${row('Trip', data.trip.title)}
        ${row('Location', data.trip.location)}
        ${row('Arrival Date', data.arrival_date)}
        ${row('Departure Date', data.departure_date)}
        ${row('Number Of People', data.number_of_people)}
      </table>
    </div>
  `

  await Promise.all([
    transporter.sendMail({
      from: `"Tour Inquiry" <${ownerEmail}>`,
      to: ownerEmail,
      replyTo: data.email,
      subject: `New Inquiry - ${data.trip.title}`,
      html: ownerHTML,
    }),

    transporter.sendMail({
      from: `"Travel Support" <${ownerEmail}>`,
      to: data.email,
      subject: `We received your inquiry - ${data.trip.title}`,
      html: customerHTML,
    }),
  ])
}