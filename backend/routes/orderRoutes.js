const express = require('express');
const { addOrderItems, getMyOrders, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// POST /api/orders - place a new order (authenticated users)
// GET /api/orders - list ALL orders (admin only)
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// GET /api/orders/myorders - list the logged-in user's own orders
router.route('/myorders').get(protect, getMyOrders);

// PUT /api/orders/:id/status - update an order's fulfillment status (admin only)
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;
