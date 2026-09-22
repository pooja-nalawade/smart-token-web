# Backend API Plan

These endpoints can be implemented with PHP/MySQL, Node/Express, or another backend.

## Patient
POST /api/patients/register
POST /api/patients/login
GET  /api/specialties
GET  /api/hospitals?lat=&lng=&radius=&specialty=&q=
POST /api/appointments
GET  /api/appointments/:id
GET  /api/appointments/:id/notifications

## Admin
POST /api/admin/login
GET  /api/admin/hospital
GET  /api/admin/departments/:id/queue
POST /api/admin/events/cancellation
POST /api/admin/events/emergency
POST /api/admin/events/doctor-unavailable

## Live updates
GET /api/queue/:appointmentId
WebSocket /ws/queue

## Event processing
Every event should:
1. Validate administrator permission.
2. Update queue state.
3. Recalculate affected ETAs.
4. Store event in audit log.
5. Create notification jobs.
6. Send SMS/email.
7. Push live UI update.

Do not send notifications directly from the browser in production.
