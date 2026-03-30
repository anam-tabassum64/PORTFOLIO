import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testMail = async () => {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || '587');
    const smtpSecure = process.env.SMTP_SECURE === 'true';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;

    console.log('Testing SMTP with:');
    console.log('Host:', smtpHost);
    console.log('Port:', smtpPort);
    console.log('User:', smtpUser);
    console.log('Pass:', smtpPass ? '****' : 'MISSING');
    console.log('To:', contactToEmail);

    if (!smtpHost || !smtpUser || !smtpPass) {
        console.error('Missing SMTP credentials in .env');
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

        console.log('Verifying transporter...');
        await transporter.verify();
        console.log('Transporter verified successfully!');

        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: contactFromEmail,
            to: contactToEmail,
            subject: 'SMTP Test - Portfolio',
            text: 'This is a test email to verify SMTP configuration.',
            html: '<p>This is a <b>test email</b> to verify SMTP configuration.</p>',
        });

        console.log('Email sent successfully:', info.messageId);
    } catch (error) {
        console.error('SMTP Error:', error);
    }
};

testMail();
