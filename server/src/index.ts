import express from 'express';
import cors    from 'cors';
import path    from 'path';
import config  from './config';
import contactRouter        from './routes/contact';
import { errorHandler }     from './middleware/errorHandler';
import { verifyMailer }     from './services/mailer';

// ── App ───────────────────────────────────────────────────────────────────────
const app = express();

// ── Core middleware ───────────────────────────────────────────────────────────
app.use(cors({ origin: config.cors.origin, methods: ['GET', 'POST'] }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// ── Serve static HTML pages from the project root ────────────────────────────
// process.cwd() = the folder where `npm run dev` is executed = project root
const PUBLIC_DIR = process.cwd();

// Serve all static assets (CSS, JS, images loaded by the HTML pages)
app.use(express.static(PUBLIC_DIR));

// ── Explicit HTML page routes (Express 5 safe) ───────────────────────────────
const pages: Record<string, string> = {
  '/':          'index.html',
  '/about':     'about.html',
  '/projects':  'projects.html',
  '/services':  'services.html',
  '/contact':   'contact.html',
};

for (const [route, file] of Object.entries(pages)) {
  app.get(route, (_req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, file));
  });
}

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRouter);

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 for unmatched API routes ──────────────────────────────────────────────
app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, message: 'API route not found.' });
});

// ── Fallback: serve index.html for all other GET requests ────────────────────
app.get('/*splat', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// ── Global error handler (must be last) ──────────────────────────────────────
app.use(errorHandler);

// ── Export app for Vercel serverless function ────────────────────────────────
export default app;

// ── Start server (for local dev / standalone container) ──────────────────────
async function start(): Promise<void> {
  try {
    await verifyMailer();
    console.log('✅ SMTP connection verified');
  } catch (err) {
    console.warn('⚠️  SMTP verification failed — email sending may not work.');
    console.warn('   Set EMAIL_USER and EMAIL_PASS in your .env file.');
  }

  app.listen(config.port, () => {
    console.log(`\n🚀 Gokul N Portfolio Server`);
    console.log(`   Local:   http://localhost:${config.port}`);
    console.log(`   API:     http://localhost:${config.port}/api/health\n`);
  });
}

if (!process.env.VERCEL) {
  start();
}

