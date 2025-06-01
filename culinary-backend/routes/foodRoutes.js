const express = require('express');
const Food = require('../models/Food');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// POST a new food item (admin only)
router.post('/', authenticateToken, async (req, res) => {
  console.log('Request Body:', req.body); // <-- Debug incoming request body here

  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }

  try {
    const { name, description, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ message: 'Name and image are required.' });
    }

    const newFood = new Food({
      name,
      description,
      image,
    });

    await newFood.save();
    res.status(201).json({ message: 'Food added successfully', food: newFood });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET all food items (public)
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
