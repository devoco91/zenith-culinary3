const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled',
  },
  url: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
