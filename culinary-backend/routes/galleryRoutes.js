const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// POST - Add a new gallery image
router.post('/', async (req, res) => {
  try {
    const { title, url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const newImage = new Gallery({ title, url });
    await newImage.save();
    res.status(201).json({ message: 'Image added', image: newImage });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET - Get all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE - Delete a gallery image by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Gallery.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json({ message: 'Image deleted successfully', image: deletedImage });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
