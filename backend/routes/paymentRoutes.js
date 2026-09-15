const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');

const router = express.Router();

// POST /api/payment/order - creates a Razorpay order for a given amount
router.post('/order', createOrder);
// POST /api/payment/verify - verifies a completed Razorpay payment's signature
router.post('/verify', verifyPayment);

module.exports = router;
