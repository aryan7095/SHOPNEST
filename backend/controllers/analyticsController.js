const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// GET admin stats - returns aggregate counts/revenue for an admin dashboard
const getAdminStats = async (req, res) => {
  try {
    // Total number of orders placed
    const totalOrders = await Order.countDocuments({});
    // Total number of products in the catalog
    const totalProducts = await Product.countDocuments({});
    // Total number of regular (non-admin) users
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Fetch all orders to compute total revenue
    // (Note: loads every order into memory — could be replaced with an aggregation
    // pipeline for better performance at scale)
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, item) => acc + item.totalAmount, 0);

    res.json({ totalOrders, totalProducts, totalUsers, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdminStats };
