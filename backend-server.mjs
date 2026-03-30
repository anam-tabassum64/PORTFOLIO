import express from 'express';
import cors from 'cors';
import handler from './api/contact.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Proxy the Vercel handler
app.all('/api/contact', async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
    console.log(`POST /api/contact is available.`);
});
