require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { notifyAppointment, notifyQueueUpdate } = require('./services/notificationService');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || true }));
app.use(express.json());

function validEmail(email) {
  return typeof email === 'string' && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function validPhone(phone) {
  return typeof phone === 'string' && /^\\+?[1-9]\\d{7,14}$/.test(phone.replace(/[\\s()-]/g, ''));
}

function makeArrival(minutes) {
  const d = new Date(Date.now() + Number(minutes || 0) * 60000);
  return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, database: 'connected', realNotifications: process.env.ENABLE_REAL_NOTIFICATIONS === 'true' });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const { name, email, phone, hospital, department, token, appointmentTime, waitMinutes } = req.body;

    if (!name || !hospital || !department || !token || !validEmail(email) || !validPhone(phone)) {
      return res.status(400).json({ error: 'Enter valid name, email, international-format phone, hospital, department and token.' });
    }

    const arrivalTime = makeArrival(waitMinutes);
    const appointment = { name, email, phone, hospital, department, token, appointmentTime, waitMinutes: Number(waitMinutes || 0), arrivalTime };

    const [result] = await pool.execute(
      `INSERT INTO appointments
       (patient_name, email, phone, hospital_name, department, token_id, appointment_time, wait_minutes, arrival_time, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'BOOKED')`,
      [name, email, phone, hospital, department, token, appointmentTime || null, appointment.waitMinutes, arrivalTime]
    );

    let notifications = [];
    if (process.env.ENABLE_REAL_NOTIFICATIONS === 'true') {
      notifications = await notifyAppointment(appointment);
    }

    res.status(201).json({ success: true, appointmentId: result.insertId, appointment, notifications });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/queue-update', async (req, res) => {
  try {
    const { appointmentIds, reason, waitMinutes } = req.body;
    if (!Array.isArray(appointmentIds) || !appointmentIds.length || !reason) {
      return res.status(400).json({ error: 'appointmentIds and reason are required.' });
    }

    const placeholders = appointmentIds.map(() => '?').join(',');
    const [rows] = await pool.query(
      `SELECT id, patient_name AS name, email, phone, hospital_name AS hospital,
              department, token_id AS token, appointment_time AS appointmentTime,
              wait_minutes AS waitMinutes, arrival_time AS arrivalTime
       FROM appointments WHERE id IN (${placeholders}) AND status = 'BOOKED'`,
      appointmentIds
    );

    const updated = [];
    for (const row of rows) {
      const nextWait = Number(waitMinutes ?? row.waitMinutes ?? 0);
      const appointment = { ...row, waitMinutes: nextWait, arrivalTime: makeArrival(nextWait) };
      await pool.execute(
        `UPDATE appointments SET wait_minutes=?, arrival_time=? WHERE id=?`,
        [appointment.waitMinutes, appointment.arrivalTime, row.id]
      );

      let notifications = [];
      if (process.env.ENABLE_REAL_NOTIFICATIONS === 'true') {
        notifications = await notifyQueueUpdate(appointment, reason);
      }
      updated.push({ id: row.id, notifications, appointment });
    }

    res.json({ success: true, updated });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(Number(process.env.PORT || 5000), () => {
  console.log(`SmartToken backend running on http://localhost:${process.env.PORT || 5000}`);
});
