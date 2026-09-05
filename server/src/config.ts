import dotenv from 'dotenv';
dotenv.config();

// ── Config ──────────────────────────────────────────────────────────────────
const config = {
  port: parseInt(process.env.PORT || '5000', 10),

  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },

  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    to:   process.env.EMAIL_TO   || process.env.EMAIL_USER || '',
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                   // max 10 contact submissions per window
  },
};

export default config;
