const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Prevent OverwriteModelError by checking if the model already exists
module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);

