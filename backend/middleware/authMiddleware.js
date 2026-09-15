const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware: verifies the JWT sent in the Authorization header and attaches
// the corresponding user (minus password) to req.user for downstream handlers
const protect = async (req, res, next) => {
  let token;
  // Expecting header format: "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract just the token part after "Bearer "
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Fetch the user from the DB (excluding password field) using the decoded id
      req.user = await User.findById(decoded.id).select('-password');
      // Proceed to the next middleware/route handler
      next();
    } catch (error) {
      // Token invalid, expired, or malformed
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // No Authorization header, or it didn't start with "Bearer"
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
