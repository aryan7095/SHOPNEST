const mongoose = require('mongoose');

// Represents a user-submitted review for a product
const reviewSchema = new mongoose.Schema({
  // Reference to the product being reviewed
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  // Reference to the user who wrote the review
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Reviewer's display name (stored directly, likely to avoid a populate lookup on read)
  name: { type: String, required: true },
  // Star rating, constrained to 1–5
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true }); // Adds createdAt / updatedAt fields automatically

module.exports = mongoose.model('Review', reviewSchema);
