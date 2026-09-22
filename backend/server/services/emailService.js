const { Resend } = require('resend');

function configured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

async function sendEmail({ to, subject, text, html }) {
  if (!configured()) {
    return { sent: false, skipped: true, channel: 'email', reason: 'Email provider is not configured' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: [to],
    subject,
    text,
    html: html || `<pre>${text}</pre>`
  });

  if (result.error) {
    throw new Error(result.error.message || 'Email provider returned an error');
  }

  return { sent: true, channel: 'email', providerId: result.data?.id || null };
}

module.exports = { sendEmail };
