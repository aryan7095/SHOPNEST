const express = require('express');
const { getAdminStats } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// GET /api/analytics - returns aggregate stats (orders, products, users, revenue)
// Restricted to authenticated admin users only
router.get('/', protect, admin, getAdminStats);

module.exports = router;
