# SmartToken V3 — Real Email and SMS Backend

The frontend files were copied unchanged from V2. This backend adds real transactional notifications.

## 1. Requirements

- Node.js 18+
- MySQL 8+
- A Resend account and verified sender/domain for email
- A Twilio account/number for SMS
- For Indian production SMS, confirm the provider's India-specific sender/template/registration requirements before deployment.

## 2. Setup

From `backend/server`:

```bash
npm install
```

Copy `.env.example` to `.env` and fill in:

- MySQL settings
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`

Keep `ENABLE_REAL_NOTIFICATIONS=false` while testing. Set it to `true` only after provider credentials are valid.

## 3. Database

Create the database and tables using:

```bash
mysql -u root -p < ../database/schema.sql
```

The existing schema contains the appointment table used by this backend. If your schema does not contain the fields used by the API, apply the migration in `../database/v3_notifications_migration.sql`.

## 4. Run

```bash
node app.js
```

Health check:

```text
GET http://localhost:5000/api/health
```

## 5. API endpoints

### Create appointment

`POST /api/appointments`

```json
{
  "name": "Test Patient",
  "email": "real-recipient@example.com",
  "phone": "+919876543210",
  "hospital": "Demo Hospital",
  "department": "Gynaecology",
  "token": "GY-024",
  "appointmentTime": "11:30 AM",
  "waitMinutes": 42
}
```

### Update affected queue

`POST /api/queue-update`

```json
{
  "appointmentIds": [1, 2, 3],
  "reason": "Emergency walk-in added 30 minutes",
  "waitMinutes": 72
}
```

## Important security notes

- Never commit `.env` or provider keys to GitHub.
- Add authentication and admin authorization before real hospital deployment.
- Validate and sanitize all patient data.
- Add delivery logs, retry handling, rate limiting and consent records before production use.
- Use HTTPS in deployment.
