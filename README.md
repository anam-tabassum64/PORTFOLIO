# 🌐 Portfolio Website

Portfolio site for **Anam Tabassum** built with **React, TypeScript, Vite, Tailwind CSS**, and a **Vercel Serverless Function** for contact email delivery.

🔗 Live Site: https://anamtabassum.vercel.app/

---

## 🚀 Architecture

- **Frontend:** Vite + React (static)
- **Backend/API:** `api/contact.js` (Vercel Serverless Function)
- **Email Service:** Nodemailer + SMTP

✅ Deployed as a **single Vercel project**  
❌ No separate backend (Render/Railway) required

---

## ⚙️ Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Create environment file
```bash
copy .env.example .env
```

### 3. Start frontend
```bash
npm run dev
```

### 4. Optional: Run serverless functions locally
```bash
npx vercel dev
```

---

## 🔐 Environment Variables

Set these in **Vercel → Project Settings → Environment Variables**

### 📧 SMTP Configuration
- `SMTP_HOST` → e.g. `smtp.gmail.com`
- `SMTP_PORT` → `587` (or `465` for SSL)
- `SMTP_SECURE` → `true` (465) / `false` (587)
- `SMTP_USER`
- `SMTP_PASS` → Use **App Password** (for Gmail)

### 📩 Contact Settings
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

### ⚙️ Optional Settings
- `ALLOW_DEV_CONTACT_FALLBACK` → `false` in production
- `PORTFOLIO_OWNER_NAME`
- `PORTFOLIO_OWNER_ROLE`
- `PORTFOLIO_EMAIL`
- `PORTFOLIO_SITE_URL`

### 🌍 Frontend Variable (Optional)
- `VITE_API_BASE_URL`  
  ➤ Only needed if API is hosted separately  
  ➤ Leave empty for same Vercel project

---

## 📬 Contact API

### Endpoint
```
POST /api/contact
```

### Request Body
```json
{
  "name": "Your name",
  "email": "you@example.com",
  "message": "Tell me about your project"
}
```

### Notes
- `company` field is a **honeypot** (must remain empty)
- Includes:
  - ✅ Basic validation  
  - 🚫 Rate limiting  

### Email Behavior
- Sends **notification email** to `CONTACT_TO_EMAIL`
- Sends **auto-reply** to the user

---

## 🚀 Deploy to Vercel

1. Push repository to GitHub
2. Import project into Vercel
3. Add environment variables
4. Click **Deploy**

🎉 Your site + API (`/api/contact`) will be live together

---

## 🔒 Security

- `.env` is ignored — **never commit it**
- Use `.env.example` as a template
- If credentials are exposed:
  - 🔄 Rotate SMTP passwords immediately
  - 🔐 Generate new App Passwords

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Nodemailer
- Vercel Serverless Functions

---

## 📌 Features

- 📱 Fully responsive design  
- ⚡ Fast static frontend (Vite)  
- 📩 Contact form with email integration  
- 🛡 Built-in validation & spam protection  
- ☁️ Serverless backend (no maintenance)

---

## ✨ Author

**Anam Tabassum**  
💻 Portfolio: https://anamtabassum.vercel.app/

---

## 📄 License

This project is open-source and available under the **MIT License**.
