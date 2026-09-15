const mongoose = require('mongoose');

// Represents a customer order placed on the ShopNest platform
const orderSchema = new mongoose.Schema({
  // Reference to the user who placed the order
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // List of products purchased in this order, each with quantity and
  // a price snapshot (so later product price changes don't affect past orders)
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  // Total amount paid for the order
  totalAmount: { type: Number, required: true },
  // Shipping address details
  address: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  // Payment gateway reference ID (e.g. Razorpay payment ID), optional
  paymentId: { type: String },
  // Order fulfillment status, defaults to 'Pending' until updated by an admin
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
}, { timestamps: true }); // Adds createdAt / updatedAt fields automatically

module.exports = mongoose.model('Order', orderSchema);
