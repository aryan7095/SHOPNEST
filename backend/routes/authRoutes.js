const express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const router = express.Router();

// Auth routes for ShopNest
// POST /api/auth/register - create a new account (logs the user in immediately)
router.post('/register', registerUser);
// POST /api/auth/login - authenticate with email/password
router.post('/login', loginUser);
// GET /api/auth/users - list all users, restricted to authenticated admins only
router.get('/users', protect, admin, getUsers);

module.exports = router;
