import nodemailer from 'nodemailer';
import config from '../config';

// ── Transporter ──────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465, // true for port 465, false for 587
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

// ── Types ────────────────────────────────────────────────────────────────────
export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

// ── Budget label helper ──────────────────────────────────────────────────────
function formatBudget(tier: string): string {
  const map: Record<string, string> = {
    tier1: 'Under $100',
    tier2: '$100 – $300',
    tier3: '$300 – $500',
    tier4: '$500+',
  };
  return map[tier] ?? tier;
}

// ── Project type label helper ────────────────────────────────────────────────
function formatProjectType(type: string): string {
  const map: Record<string, string> = {
    website: 'Website Development',
    mobile: 'Mobile App Development',
    product: 'Full Digital Product',
    consultation: 'Technical Consultation',
  };
  return map[type] ?? type;
}

// ── Send contact inquiry email ───────────────────────────────────────────────
export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const { name, email, projectType, budget, message } = payload;

  // ── Email TO Gokul (notification) ──────────────────────────────────────────
  await transporter.sendMail({
    from: `"Portfolio Contact" <${config.email.user}>`,
    to: config.email.to,
    replyTo: email,
    subject: `📬 New Project Inquiry from ${name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: Inter, sans-serif; background:#f9f9f9; margin:0; padding:0; }
          .card { max-width:600px; margin:40px auto; background:#fff; border-radius:16px;
                  padding:32px; border:1px solid #e4e4e7; }
          h2   { font-size:1.5rem; font-weight:800; color:#09090b; margin-bottom:4px; }
          .sub { color:#71717a; font-size:0.875rem; margin-bottom:24px; }
          .row { margin-bottom:16px; }
          .label { font-size:0.75rem; font-weight:600; text-transform:uppercase;
                   letter-spacing:0.08em; color:#71717a; margin-bottom:4px; }
          .value { font-size:1rem; color:#09090b; }
          .msg  { background:#f4f4f5; border-radius:10px; padding:16px;
                  font-size:0.9rem; color:#3f3f46; white-space:pre-wrap; }
          .footer { margin-top:24px; font-size:0.75rem; color:#a1a1aa; text-align:center; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>New Project Inquiry</h2>
          <p class="sub">Received via gokuln.dev contact form</p>

          <div class="row">
            <div class="label">Name</div>
            <div class="value">${name}</div>
          </div>
          <div class="row">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="row">
            <div class="label">Project Type</div>
            <div class="value">${formatProjectType(projectType)}</div>
          </div>
          <div class="row">
            <div class="label">Estimated Budget</div>
            <div class="value">${formatBudget(budget)}</div>
          </div>
          <div class="row">
            <div class="label">Message</div>
            <div class="msg">${message}</div>
          </div>

          <div class="footer">© 2026 Gokul N Portfolio — gokuln.dev</div>
        </div>
      </body>
      </html>
    `,
  });

  // ── Auto-reply TO the client ────────────────────────────────────────────────
  await transporter.sendMail({
    from: `"Gokul N" <${config.email.user}>`,
    to: email,
    subject: `✅ Got your message, ${name}! I'll respond within 24 hours.`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: Inter, sans-serif; background:#f9f9f9; margin:0; padding:0; }
          .card { max-width:600px; margin:40px auto; background:#fff; border-radius:16px;
                  padding:32px; border:1px solid #e4e4e7; }
          h2   { font-size:1.4rem; font-weight:800; color:#09090b; }
          p    { color:#52525b; line-height:1.6; }
          .chip { display:inline-block; background:#f4f4f5; border-radius:9999px;
                  padding:4px 12px; font-size:0.75rem; color:#09090b; margin:4px 2px; }
          .cta  { display:inline-block; margin-top:20px; padding:10px 24px;
                  background:#09090b; color:#fff; border-radius:9999px;
                  text-decoration:none; font-size:0.875rem; font-weight:600; }
          .footer { margin-top:24px; font-size:0.75rem; color:#a1a1aa; text-align:center; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Hey ${name}, I received your inquiry! 👋</h2>
          <p>
            Thank you for reaching out. I've received your project brief and will review it carefully.
            You can expect a reply from me within <strong>24 hours</strong>.
          </p>
          <p><strong>Here's a summary of what you submitted:</strong></p>
          <div>
            <span class="chip">📁 ${formatProjectType(projectType)}</span>
            <span class="chip">💰 ${formatBudget(budget)}</span>
          </div>
          <p style="margin-top:16px;">
            In the meantime, feel free to check out my work or reach me directly at
            <a href="mailto:https://github.com/Gokul-CyberExpert">https://github.com/Gokul-CyberExpert</a>.
          </p>
          <a class="cta" href="https://gokuln.dev/projects">View My Projects →</a>
          <div class="footer">© 2026 Gokul N — Freelance Web & Mobile Developer</div>
        </div>
      </body>
      </html>
    `,
  });
}

// ── Verify SMTP connection on startup ────────────────────────────────────────
export async function verifyMailer(): Promise<void> {
  await transporter.verify();
}
