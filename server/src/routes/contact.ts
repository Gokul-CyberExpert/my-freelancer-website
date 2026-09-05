import { Router, Request, Response, NextFunction } from 'express';
import { sendContactEmail, ContactPayload } from '../services/mailer';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

// ── Allowed values for validation ────────────────────────────────────────────
const VALID_PROJECT_TYPES = ['website', 'mobile', 'product', 'consultation'];
const VALID_BUDGETS       = ['tier1', 'tier2', 'tier3', 'tier4'];

// ── Sanitise a string: trim and strip HTML tags ───────────────────────────────
function sanitise(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/<[^>]*>/g, '');
}

// ── Email format check ───────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── POST /api/contact ─────────────────────────────────────────────────────────
router.post(
  '/',
  rateLimiter,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const name        = sanitise(req.body?.name);
      const email       = sanitise(req.body?.email);
      const projectType = sanitise(req.body?.projectType);
      const budget      = sanitise(req.body?.budget);
      const message     = sanitise(req.body?.message);

      // ── Validate required fields ────────────────────────────────────────────
      if (!name || !email || !projectType || !budget || !message) {
        res.status(400).json({
          success: false,
          message: 'All fields are required: name, email, projectType, budget, message.',
        });
        return;
      }

      if (name.length > 100) {
        res.status(400).json({ success: false, message: 'Name must be 100 characters or fewer.' });
        return;
      }

      if (!isValidEmail(email)) {
        res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        return;
      }

      if (!VALID_PROJECT_TYPES.includes(projectType)) {
        res.status(400).json({ success: false, message: 'Invalid project type.' });
        return;
      }

      if (!VALID_BUDGETS.includes(budget)) {
        res.status(400).json({ success: false, message: 'Invalid budget selection.' });
        return;
      }

      if (message.length < 10) {
        res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
        return;
      }

      if (message.length > 5000) {
        res.status(400).json({ success: false, message: 'Message must be 5000 characters or fewer.' });
        return;
      }

      // ── Send email ─────────────────────────────────────────────────────────
      const payload: ContactPayload = { name, email, projectType, budget, message };
      await sendContactEmail(payload);

      console.log(`[Contact] New inquiry from ${name} <${email}> — ${projectType} / ${budget}`);

      res.status(200).json({
        success: true,
        message: "Your inquiry has been received! Gokul will respond within 24 hours.",
      });
    } catch (err) {
      next(err); // hand off to errorHandler middleware
    }
  }
);

export default router;
