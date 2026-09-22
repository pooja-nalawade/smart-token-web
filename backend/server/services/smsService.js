const twilio = require('twilio');

function configured() {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER
  );
}

async function sendSms({ to, body }) {
  if (!configured()) {
    return { sent: false, skipped: true, channel: 'sms', reason: 'SMS provider is not configured' };
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const message = await client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
    body
  });

  return { sent: true, channel: 'sms', providerId: message.sid, status: message.status };
}

module.exports = { sendSms };
