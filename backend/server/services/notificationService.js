const { sendEmail } = require('./emailService');
const { sendSms } = require('./smsService');

function appointmentMessage(a) {
  return {
    subject: `SmartToken appointment confirmed - ${a.token}`,
    text:
`Your SmartToken appointment is confirmed.

Patient: ${a.name}
Hospital: ${a.hospital}
Department: ${a.department}
Token: ${a.token}
Appointment time: ${a.appointmentTime}
Estimated waiting time: ${a.waitMinutes} minutes
Estimated arrival time: ${a.arrivalTime}

Please carry your identification and arrive near the estimated arrival time.`,
  };
}

async function notifyAppointment(a) {
  const results = [];
  const msg = appointmentMessage(a);

  if (a.email) {
    results.push(await sendEmail({ to: a.email, subject: msg.subject, text: msg.text }));
  }
  if (a.phone) {
    results.push(await sendSms({
      to: a.phone,
      body: `SmartToken confirmed: ${a.token}, ${a.department}, ${a.hospital}. Wait ${a.waitMinutes} min. Arrive ${a.arrivalTime}.`
    }));
  }
  return results;
}

async function notifyQueueUpdate(a, reason) {
  const subject = `SmartToken queue update - ${a.token}`;
  const text =
`SmartToken queue update

Patient: ${a.name}
Hospital: ${a.hospital}
Department: ${a.department}
Token: ${a.token}
Reason: ${reason}
New estimated waiting time: ${a.waitMinutes} minutes
New estimated arrival time: ${a.arrivalTime}

Please use the latest estimate shown in this message.`;

  const results = [];
  if (a.email) results.push(await sendEmail({ to: a.email, subject, text }));
  if (a.phone) results.push(await sendSms({
    to: a.phone,
    body: `SmartToken update ${a.token}: ${reason}. New wait ${a.waitMinutes} min; arrive ${a.arrivalTime}.`
  }));
  return results;
}

module.exports = { notifyAppointment, notifyQueueUpdate };
