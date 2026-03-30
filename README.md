# Portfolio Website

Portfolio site for **Anam Tabassum** built with React, TypeScript, Vite, Tailwind CSS, and a Vercel Serverless Function for contact email delivery.

## Architecture

- Frontend: Vite + React (static)
- API: `api/contact.js` (Vercel Serverless Function)
- Email: Nodemailer + SMTP

This setup deploys in a **single Vercel project**. No separate Render/Railway backend is needed.

## Local development

1. Install dependencies:

```sh
npm install
```

2. Create local env file from template:

```sh
copy .env.example .env
```

3. Start frontend:

```sh
npm run dev
```

4. Optional local API testing (serverless functions):

```sh
npx vercel dev
```

## Environment variables

Set these in Vercel Project Settings -> Environment Variables:

- `SMTP_HOST` (example: `smtp.gmail.com`)
- `SMTP_PORT` (example: `587`)
- `SMTP_SECURE` (`true` for SSL/465, `false` for STARTTLS/587)
- `SMTP_USER`
- `SMTP_PASS` (Gmail app password if using Gmail)
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `ALLOW_DEV_CONTACT_FALLBACK` (`false` in production)
- `PORTFOLIO_OWNER_NAME` (optional)
- `PORTFOLIO_OWNER_ROLE` (optional)
- `PORTFOLIO_EMAIL` (optional)
- `PORTFOLIO_SITE_URL` (optional)

Optional frontend variable:

- `VITE_API_BASE_URL` only if API is hosted on a different domain. Leave unset for same-project Vercel deploys.

## Contact API

Endpoint:

- `POST /api/contact`

Body:

```json
{
  "name": "Your name",
  "email": "you@example.com",
  "subject": "Project inquiry",
  "message": "Tell me about your project",
  "company": ""
}
```

Notes:

- `company` is a honeypot field and must stay empty.
- API includes basic validation and rate limiting.
- When SMTP is configured, it sends:
  - Notification email to `CONTACT_TO_EMAIL`
  - Auto-reply to the sender

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Add the environment variables above.
4. Deploy.

Your frontend and `/api/contact` route will be live in one deployment.

## Security

- `.env` is ignored and should never be committed.
- Use `.env.example` as the template for required keys.
- If credentials were ever committed, rotate SMTP app passwords immediately.
