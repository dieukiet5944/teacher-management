console.log("🔥 THIS IS SERVER.JS VERSION 999");
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import teacherRoutes from './routes/teacher.routes.js';
import positionRoutes from './routes/position.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
  res.send('✅ Teacher Management API is running...');
});
app.get('/ping', (req, res) => {
  console.log("🔥 PING HIT");
  res.send("pong");
});

app.use('/api/teachers', teacherRoutes);
app.use('/api/positions', positionRoutes);
app.use((req, res, next) => {
  console.log("🔥 REQUEST:", req.method, req.url);
  next();
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});