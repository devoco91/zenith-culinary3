const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  cardNumber: String,
  cardName: String,
  expiryDate: String,
  cvv: String,
  promoCode: String,
  agreedToTerms: Boolean,
  courseId: String,
  courseTitle: String,
  courseStartDate: String,
  courseDuration: String,
  coursePrice: Number,
  courseDiscount: Number,
}, { timestamps: true });

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
