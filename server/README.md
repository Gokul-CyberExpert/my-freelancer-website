# Gokul N — Freelancer Portfolio Backend

## Environment Variables
Create a `.env` file in the project root with:

```
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=https://github.com/Gokul-CyberExpert
CORS_ORIGIN=http://localhost:3000
```

## Setup

```bash
# Install dependencies
npm install

# Run in development (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## API Endpoints

### POST `/api/contact`
Submits a project inquiry from the contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "projectType": "website",
  "budget": "tier2",
  "message": "I need a landing page..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Your inquiry has been received! Gokul will respond within 24 hours."
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "All fields are required."
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-09-04T18:00:00.000Z"
}
```

## Project Structure

```
server/
├── src/
│   ├── index.ts          # Server entry point
│   ├── config.ts         # Environment config
│   ├── routes/
│   │   └── contact.ts    # Contact route handler
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── rateLimiter.ts
│   └── services/
│       └── mailer.ts     # Nodemailer email service
├── tsconfig.json
└── .env                  # (gitignored)
```
