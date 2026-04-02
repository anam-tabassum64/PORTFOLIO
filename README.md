<div align="center">
<br/>
```
╔═══════════════════════════════════════════╗
║          anam tabassum · portfolio        ║
╚═══════════════════════════════════════════╝
```
A modern portfolio built with Vite · React · TypeScript · Tailwind CSS  
Serverless contact delivery via Vercel — no backend required.
<br/>
![Deploy with Vercel](https://vercel.com/button)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
</div>
---
Architecture
```
┌─────────────────────────────────────────────────┐
│                  Vercel Project                 │
│                                                 │
│   ┌──────────────────┐   ┌───────────────────┐  │
│   │   Frontend        │   │  Serverless API   │  │
│   │                  │   │                   │  │
│   │  Vite + React    │──▶│  /api/contact.js  │  │
│   │  Static Build    │   │                   │  │
│   └──────────────────┘   └────────┬──────────┘  │
│                                   │             │
└───────────────────────────────────┼─────────────┘
                                    │
                              ┌─────▼──────┐
                              │  Nodemailer │
                              │    SMTP     │
                              └────────────┘
```
Single Vercel project. No separate backend service needed.
---
Getting Started
1. Install dependencies
```sh
npm install
```
2. Configure environment
```sh
copy .env.example .env
```
3. Start the dev server
```sh
npm run dev
```
4. Test serverless functions locally (optional)
```sh
npx vercel dev
```
---
Environment Variables
Set these in Vercel → Project Settings → Environment Variables.
SMTP / Email
Variable	Description	Example
`SMTP_HOST`	SMTP server hostname	`smtp.gmail.com`
`SMTP_PORT`	SMTP port	`587`
`SMTP_SECURE`	`true` for SSL/465, `false` for STARTTLS/587	`false`
`SMTP_USER`	SMTP username / email address	`you@gmail.com`
`SMTP_PASS`	SMTP password or Gmail app password	`xxxx xxxx xxxx xxxx`
`CONTACT_TO_EMAIL`	Where contact form submissions are sent	`inbox@yourdomain.com`
`CONTACT_FROM_EMAIL`	Sender address for outgoing emails	`noreply@yourdomain.com`
`ALLOW_DEV_CONTACT_FALLBACK`	Set to `false` in production	`false`
Portfolio Metadata (optional)
Variable	Description
`PORTFOLIO_OWNER_NAME`	Displayed name
`PORTFOLIO_OWNER_ROLE`	Role or title
`PORTFOLIO_EMAIL`	Public contact email
`PORTFOLIO_SITE_URL`	Production URL
Frontend (optional)
Variable	Description
`VITE_API_BASE_URL`	Only needed if API is hosted on a different domain. Leave unset for same-project Vercel deploys.
---
Contact API
Endpoint: `POST /api/contact`
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Tell me about your project"
}
```
What happens on submission:
✉️ Notification email sent to `CONTACT_TO_EMAIL`
🤖 Auto-reply sent to the sender
🛡️ Basic validation and rate limiting applied
> **Note:** The `company` field is a honeypot for bot detection — it must remain empty.
---
Deploying to Vercel
```
1. Push this repo to GitHub
2. Import the repo in vercel.com/new
3. Add all environment variables
4. Click Deploy
```
Your frontend and `/api/contact` will be live in a single deployment.
---
Security
`.env` is git-ignored and must never be committed
Use `.env.example` as the reference template for required keys
If credentials were ever committed, rotate your SMTP app password immediately
---
<div align="center">
<br/>
Designed & developed by Anam Tabassum
</div>
