const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

// ✅ POST: Save a new transaction (student application)
router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      courseId,
      courseTitle,
      courseStartDate,
      courseDuration,
      coursePrice,
      courseDiscount,
    } = req.body;

    // 🛑 Validation: Make sure a course is selected
    if (!courseId || !courseTitle) {
      return res.status(400).json({ message: 'Please select a course before enrolling.' });
    }

    const newTransaction = new Transaction({
      firstName,
      lastName,
      email,
      phone,
      courseId,
      courseTitle,
      courseStartDate,
      courseDuration,
      coursePrice,
      courseDiscount,
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Submission failed', error: error.message });
  }
});

// ✅ GET: Admin can view all student applications (with course info only)
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    const formatted = transactions.map(tx => ({
      _id: tx._id,
      firstName: tx.firstName,
      lastName: tx.lastName,
      email: tx.email,
      phone: tx.phone,
      courseId: tx.courseId,
      courseTitle: tx.courseTitle,
      courseStartDate: tx.courseStartDate,
      courseDuration: tx.courseDuration,
      coursePrice: tx.coursePrice,
      courseDiscount: tx.courseDiscount,
      createdAt: tx.createdAt,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
  }
});

module.exports = router;
