import { Request, Response, NextFunction } from 'express';

// ── Global error handler ──────────────────────────────────────────────────────
// Must have 4 parameters so Express treats it as an error-handling middleware.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[Error]', err.message);

  // Nodemailer SMTP auth errors — tell the dev without leaking internals
  if (err.message.toLowerCase().includes('auth') || err.message.toLowerCase().includes('smtp')) {
    res.status(503).json({
      success: false,
      message: 'Email service is currently unavailable. Please try again later or reach out directly at https://github.com/Gokul-CyberExpert.',
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred. Please try again later.',
  });
}
