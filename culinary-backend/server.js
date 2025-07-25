// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGODB_URI) {
  console.error('❌ Missing MONGODB_URI in environment!');
  process.exit(1);
}

connectDB();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3002',
  'https://zenithculinary-seven.vercel.app',
  'https://zenithculinary.com',
  'https://www.zenithculinary.com' // Added for www subdomain
];

// Debug middleware to log incoming Host & Origin
app.use((req, res, next) => {
  console.log('➡️ Host:', req.hostname);
  console.log('➡️ Origin:', req.headers.origin);
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    console.log('🌐 CORS origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ Not allowed by CORS: ${origin}`);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/foods', require('./routes/foodRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

app.get('/', (req, res) => res.send('Culinary Hub API Running...'));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
