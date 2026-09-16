export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { resend } from '@/lib/resend';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request) {
  const body = await request.json();
  const { firstName, lastName, phone, company, email, description } = body;

  const trimmed = {
    firstName: firstName?.trim(),
    lastName: lastName?.trim(),
    phone: phone?.trim(),
    company: company?.trim(),
    email: email?.trim(),
    description: description?.trim(),
  };

  if (
    !trimmed.firstName ||
    !trimmed.lastName ||
    !trimmed.phone ||
    !trimmed.company ||
    !trimmed.email ||
    !trimmed.description
  ) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  const thankYouHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;color:#333;max-width:600px;margin:0 auto;padding:24px;">
  <p>Hi ${escapeHtml(trimmed.firstName)},</p>
  <p>Thank you for reaching out to us. We have received your message and a member of our team will be in touch with you shortly.</p>
  <p>Best regards,<br>The iTechs Arabia Team</p>
</body>
</html>`;

  const notificationHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;color:#333;max-width:600px;margin:0 auto;padding:24px;">
  <h2 style="margin-top:0;">New Contact Form Submission</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:8px;border:1px solid #ddd;font-weight:bold;width:140px;">First Name</td>
      <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(trimmed.firstName)}</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Last Name</td>
      <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(trimmed.lastName)}</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td>
      <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(trimmed.phone)}</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Company</td>
      <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(trimmed.company)}</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td>
      <td style="padding:8px;border:1px solid #ddd;">${escapeHtml(trimmed.email)}</td>
    </tr>
    <tr>
      <td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td>
      <td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(trimmed.description)}</td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await Promise.all([
      resend.emails.send({
        from: process.env.RESEND_FROM_NOREPLY,
        to: trimmed.email,
        subject: 'Thank you for contacting us',
        html: thankYouHtml,
      }),
      resend.emails.send({
        from: process.env.RESEND_FROM_NOREPLY,
        to: process.env.CONTACT_RECIPIENT_EMAIL,
        replyTo: trimmed.email,
        subject: `New contact form submission from ${trimmed.firstName} ${trimmed.lastName}`,
        html: notificationHtml,
      }),
    ]);

    return Response.json({ success: true });
  } catch (error) {
    console.error('[contact route]', error);
    return Response.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
