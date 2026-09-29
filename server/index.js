import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import organizationsRouter from './routes/organizations.js';
import { pool } from './db/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/organizations', organizationsRouter);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const client = await pool.connect();
    client.release();
    res.json({ status: 'ok', database: 'connected', timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SkillSync ATS Express Server running on http://localhost:${PORT}`);
});
