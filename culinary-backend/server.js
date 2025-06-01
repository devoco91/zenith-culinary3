const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const courseRoutes = require('./routes/courseRoutes');
const galleryRoutes = require('./routes/galleryRoutes');  // <-- Added this line

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/gallery', galleryRoutes);  // <-- Added this line

// Default route
app.get('/', (req, res) => res.send('Culinary Hub API Running...'));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
