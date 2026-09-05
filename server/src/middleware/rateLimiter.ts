import { Request, Response, NextFunction } from 'express';

// ── Simple in-memory rate limiter ────────────────────────────────────────────
// Maps IP → { count, resetAt }
interface RateRecord { count: number; resetAt: number; }
const store = new Map<string, RateRecord>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_HITS   = 10;             // max submissions per window per IP

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip  = req.ip ?? req.socket.remoteAddress ?? 'unknown';
  const now = Date.now();

  const record = store.get(ip);

  if (!record || now > record.resetAt) {
    // New window
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    next();
    return;
  }

  if (record.count >= MAX_HITS) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    res.set('Retry-After', String(retryAfter));
    res.status(429).json({
      success: false,
      message: `Too many requests. Please wait ${Math.ceil(retryAfter / 60)} minute(s) before trying again.`,
    });
    return;
  }

  record.count += 1;
  next();
}
