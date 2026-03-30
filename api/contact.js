import nodemailer from 'nodemailer';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimitStore = new Map();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isPlaceholderValue = (value) => {
  const normalized = String(value || '').trim();
  return (
    !normalized ||
    normalized === 'YOUR_SMTP_USERNAME' ||
    normalized === 'YOUR_SMTP_APP_PASSWORD' ||
    normalized === 'your@email.com'
  );
};

const getEnvValue = (key, fallback = '') => {
  const value = process.env[key];
  return isPlaceholderValue(value) ? fallback : value;
};

const getFirstEnvValue = (keys, fallback = '') => {
  for (const key of keys) {
    const value = getEnvValue(key, '');
    if (value) {
      return value;
    }
  }
  return fallback;
};

const sanitizeText = (value, maxLength) => String(value || '').trim().slice(0, maxLength);
const sanitizeMessage = (value, maxLength) =>
  String(value || '')
    .replace(/\r\n/g, '\n')
    .trim()
    .slice(0, maxLength);

const escapeHtml = (value) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const nl2br = (value) => escapeHtml(value).replace(/\n/g, '<br />');

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return String(forwardedFor[0] || '').split(',')[0].trim();
  }

  return req.socket?.remoteAddress || 'unknown';
};

const applyRateLimit = (req) => {
  const key = getClientIp(req);
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || now - current.windowStart > WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (current.count >= MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  return true;
};

const parseBody = (req) => {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return {};
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
    message: sanitizeMessage(body.message, 2000),
  };

  if (!payload.subject) {
    payload.subject = 'Portfolio Inquiry';
  }

  if (!payload.name || !payload.email || !payload.message) {
    return { ok: false, status: 400, error: 'Name, email, and message are required.' };
  }

  if (!emailPattern.test(payload.email)) {
    return { ok: false, status: 400, error: 'Enter a valid email address.' };
  }

  return { ok: true, payload };
};

const renderOwnerNotificationHtml = (payload) => `
  <div style="margin:0;padding:24px;background:#f7f3e9;font-family:Arial,sans-serif;color:#2f2416;">
    <div style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e1d7c3;border-radius:20px;padding:24px;">
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#8a7557;">New Inquiry</p>
      <h2 style="margin:0 0 18px;font-size:24px;color:#342717;">A new message arrived from your portfolio</h2>
      <p style="margin:0 0 16px;"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p style="margin:0 0 16px;"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p style="margin:0 0 16px;"><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <div style="margin-top:10px;padding:16px;border:1px solid #e8dcc6;border-radius:14px;background:#fcfaf4;">
        <p style="margin:0;font-size:15px;line-height:1.7;">${nl2br(payload.message)}</p>
      </div>
    </div>
  </div>
`;

const renderAutoReplyHtml = (payload, ownerName, ownerRole, ownerEmail, siteUrl) => `
  <div style="margin:0;padding:24px;background:#f7f3e9;font-family:Arial,sans-serif;color:#2f2416;">
    <div style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e1d7c3;border-radius:20px;padding:24px;">
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#8a7557;">Message Received</p>
      <h2 style="margin:0 0 18px;font-size:24px;color:#342717;">Thanks for reaching out, ${escapeHtml(payload.name)}</h2>
      <p style="margin:0 0 12px;line-height:1.7;">Your message was delivered successfully. A reply will come soon.</p>
      <div style="margin-top:10px;padding:16px;border:1px solid #e8dcc6;border-radius:14px;background:#fcfaf4;">
        <p style="margin:0 0 8px;"><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
        <p style="margin:0;font-size:15px;line-height:1.7;">${nl2br(payload.message)}</p>
      </div>
      <div style="margin-top:18px;padding-top:16px;border-top:1px solid #e8dcc6;font-size:14px;line-height:1.7;color:#5d4b36;">
        <strong>${escapeHtml(ownerName)}</strong><br />
        ${escapeHtml(ownerRole)}<br />
        ${escapeHtml(ownerEmail)}<br />
        ${escapeHtml(siteUrl)}
      </div>
    </div>
  </div>
`;

const renderOwnerNotificationText = (payload) =>
  `New portfolio inquiry\n\nName: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\n${payload.message}`;

const renderAutoReplyText = (payload, ownerName, ownerRole, ownerEmail, siteUrl) =>
  `Hi ${payload.name},\n\nThanks for reaching out to ${ownerName}. This is a confirmation that your message was received.\n\nSubject: ${payload.subject}\nMessage:\n${payload.message}\n\n${ownerName}\n${ownerRole}\n${ownerEmail}\n${siteUrl}`;

const isTrue = (value) => String(value || '').trim().toLowerCase() === 'true';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  if (!applyRateLimit(req)) {
    res.status(429).json({
      error: 'Too many requests. Please wait a few minutes before trying again.',
    });
    return;
  }

  const result = validatePayload(parseBody(req));
  if (!result.ok) {
    res.status(result.status).json({ error: result.error });
    return;
  }

  const payload = result.payload;
  const smtpHost = getFirstEnvValue(['SMTP_HOST'], '');
  const smtpPort = Number(getFirstEnvValue(['SMTP_PORT'], '587'));
  const smtpSecure = isTrue(getFirstEnvValue(['SMTP_SECURE'], 'false'));
  const smtpUser = getFirstEnvValue(['SMTP_USER', 'EMAIL_USER', 'GMAIL_USER'], '');
  const smtpPass = getFirstEnvValue(['SMTP_PASS', 'EMAIL_PASS', 'GMAIL_APP_PASSWORD'], '');
  const contactToEmail = getFirstEnvValue(['CONTACT_TO_EMAIL', 'RECEIVER_EMAIL'], '');
  const contactFromEmail = getFirstEnvValue(
    ['CONTACT_FROM_EMAIL', 'SMTP_FROM_EMAIL', 'SENDER_EMAIL'],
    smtpUser,
  );
  const ownerName = process.env.PORTFOLIO_OWNER_NAME || 'Anam Tabassum';
  const ownerRole = process.env.PORTFOLIO_OWNER_ROLE || 'Backend Developer and Data-Focused Software Engineer';
  const ownerEmail = process.env.PORTFOLIO_EMAIL || contactToEmail || contactFromEmail || smtpUser;
  const siteUrl = process.env.PORTFOLIO_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || '';

  const missingSmtpEnv = [
    !smtpHost ? 'SMTP_HOST' : null,
    Number.isNaN(smtpPort) ? 'SMTP_PORT' : null,
    !smtpUser ? 'SMTP_USER' : null,
    !smtpPass ? 'SMTP_PASS' : null,
    !contactToEmail ? 'CONTACT_TO_EMAIL' : null,
    !contactFromEmail ? 'CONTACT_FROM_EMAIL' : null,
  ].filter(Boolean);

  const isProduction =
    process.env.VERCEL_ENV === 'production' || String(process.env.NODE_ENV || '').toLowerCase() === 'production';
  const allowDevFallback = isTrue(
    getFirstEnvValue(['ALLOW_DEV_CONTACT_FALLBACK'], isProduction ? 'false' : 'true'),
  );

  if (missingSmtpEnv.length > 0) {
    if (allowDevFallback) {
      res.status(201).json({
        message:
          'Message captured in development mode. Configure SMTP credentials to enable real email delivery.',
        emailed: false,
        autoReplied: false,
      });
      return;
    }

    res.status(503).json({
      error: 'Contact service is not configured yet. Set SMTP credentials before using this form.',
      missing: {
        smtp: missingSmtpEnv,
      },
    });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await Promise.all([
      transporter.sendMail({
        to: contactToEmail,
        from: contactFromEmail,
        replyTo: payload.email,
        subject: `[Portfolio Contact] ${payload.subject}`,
        text: renderOwnerNotificationText(payload),
        html: renderOwnerNotificationHtml(payload),
      }),
      transporter.sendMail({
        to: payload.email,
        from: contactFromEmail,
        replyTo: contactToEmail || contactFromEmail,
        subject: `Thanks for contacting ${ownerName}`,
        text: renderAutoReplyText(payload, ownerName, ownerRole, ownerEmail, siteUrl),
        html: renderAutoReplyHtml(payload, ownerName, ownerRole, ownerEmail, siteUrl),
      }),
    ]);

    res.status(201).json({
      message: 'Message sent successfully. A thank-you email has been sent to your inbox.',
      emailed: true,
      autoReplied: true,
    });
  } catch (error) {
    if (allowDevFallback) {
      res.status(201).json({
        message:
          'Message captured in development mode. SMTP delivery failed, so no email was sent this time.',
        emailed: false,
        autoReplied: false,
      });
      return;
    }

    if (error?.code === 'EAUTH' || error?.responseCode === 535) {
      res.status(502).json({
        error: 'SMTP login failed. Update SMTP_USER and SMTP_PASS with a valid App Password and try again.',
      });
      return;
    }

    if (error?.code === 'ECONNECTION' || error?.code === 'ETIMEDOUT') {
      res.status(502).json({
        error: 'Unable to connect to the SMTP server right now. Please try again in a moment.',
      });
      return;
    }

    if (error?.code === 'EENVELOPE') {
      res.status(400).json({
        error: 'Email address is invalid or rejected by the mail provider.',
      });
      return;
    }

    res.status(500).json({ error: 'Internal server error.' });
  }
}
