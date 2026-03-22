import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

const app = express();

const PORT = Number(process.env.PORT || 5000);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:8080';
const MONGODB_URI = process.env.MONGODB_URI || '';
const SMTP_HOST = process.env.SMTP_HOST || '';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || '';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || SMTP_USER || '';

app.use(
  cors({
    origin: CORS_ORIGIN,
  }),
);
app.use(express.json({ limit: '1mb' }));

const rateLimitStore = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 255 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    source: { type: String, default: 'portfolio' },
  },
  { timestamps: true },
);

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', contactSchema);

const sanitizeText = (value, maxLength) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const hasEmailConfig = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL);

let transporter = null;
if (hasEmailConfig) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

let databaseReady = false;
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      databaseReady = true;
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      databaseReady = false;
      console.error('MongoDB connection error:', error.message);
    });
} else {
  console.warn('[contact-backend] MONGODB_URI is not set. MongoDB storage is disabled.');
}

if (!hasEmailConfig) {
  console.warn('[contact-backend] SMTP credentials are incomplete. Email forwarding is disabled.');
}

const applyRateLimit = (req, res, next) => {
  const key = req.ip || 'unknown';
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || now - current.windowStart > WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    next();
    return;
  }

  if (current.count >= MAX_REQUESTS) {
    res.status(429).json({
      error: 'Too many requests. Please wait a few minutes before trying again.',
    });
    return;
  }

  current.count += 1;
  next();
};

const validatePayload = (body) => {
  const company = sanitizeText(body.company, 200);
  if (company) {
    return { ok: false, status: 400, error: 'Spam protection triggered.' };
  }

  const payload = {
    name: sanitizeText(body.name, 100),
    email: sanitizeText(body.email, 255),
    subject: sanitizeText(body.subject, 200),
    message: sanitizeText(body.message, 2000),
  };

  if (!payload.name || !payload.email || !payload.subject || !payload.message) {
    return { ok: false, status: 400, error: 'All fields are required.' };
  }

  if (!emailPattern.test(payload.email)) {
    return { ok: false, status: 400, error: 'Enter a valid email address.' };
  }

  return { ok: true, payload };
};

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: databaseReady ? 'connected' : 'not-configured-or-unavailable',
    email: hasEmailConfig ? 'configured' : 'not-configured',
  });
});

app.post('/api/contact', applyRateLimit, async (req, res) => {
  const result = validatePayload(req.body || {});

  if (!result.ok) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  if (!databaseReady && !hasEmailConfig) {
    res.status(503).json({
      error: 'Contact service is not configured yet. Set MongoDB or SMTP credentials before using this form.',
    });
    return;
  }

  const { payload } = result;

  try {
    let documentId = null;

    if (databaseReady) {
      const doc = await ContactMessage.create(payload);
      documentId = doc._id;
    }

    if (transporter) {
      await transporter.sendMail({
        to: CONTACT_TO_EMAIL,
        from: CONTACT_FROM_EMAIL,
        replyTo: payload.email,
        subject: `[Portfolio Contact] ${payload.subject}`,
        text: `Name: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\n${payload.message}`,
      });
    }

    res.status(201).json({
      id: documentId,
      message: 'Message sent successfully.',
      stored: databaseReady,
      emailed: hasEmailConfig,
    });
  } catch (error) {
    console.error('Error handling /api/contact:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact backend listening on port ${PORT}`);
});
