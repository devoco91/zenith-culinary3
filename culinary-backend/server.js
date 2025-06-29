// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔒 Ensure DB URI is set
if (!process.env.MONGODB_URI) {
  console.error('❌ Missing MONGODB_URI in environment!');
  process.exit(1);
}

// ✅ Connect to MongoDB
connectDB();

// ✅ Allowed frontend origins
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3002',
    'https://zenithculinary-seven.vercel.app',
    'https://zenithculinary.com'
  ],
  credentials: true
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/foods', require('./routes/foodRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes')); 


app.get('/', (req, res) => res.send('Culinary Hub API Running...'));


app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
