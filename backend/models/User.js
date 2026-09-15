const mongoose = require('mongoose');

// Represents a ShopNest user (customer or admin)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Must be unique across all users; used for login
  email: { type: String, required: true, unique: true },
  // Stores the bcrypt-hashed password (never plaintext — see userController.registerUser)
  password: { type: String, required: true },
  // Determines access level; defaults to 'user'
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true }); // Adds createdAt / updatedAt fields automatically

module.exports = mongoose.model('User', userSchema);
