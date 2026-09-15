const mongoose = require('mongoose');

// Represents a product listed for sale on the ShopNest platform
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  // Number of units currently in stock
  stock: { type: Number, required: true },
  // Product image URL, typically a Cloudinary secure_url set on creation/update
  imageUrl: { type: String, required: true },
  // Average rating, defaults to 0 until reviews are added
  ratings: { type: Number, default: 0 },
  // Count of reviews contributing to the rating
  numReviews: { type: Number, default: 0 }
}, { timestamps: true }); // Adds createdAt / updatedAt fields automatically

module.exports = mongoose.model('Product', productSchema);
