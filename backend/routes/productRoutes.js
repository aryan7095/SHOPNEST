const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const multer = require('multer');
// Configures multer to save uploaded files to the local 'uploads/' directory
// before they're forwarded to Cloudinary in the controller
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// GET /api/products - list all products (public)
// POST /api/products - create a new product with optional image upload (admin only)
router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);

// GET /api/products/:id - get a single product (public)
// PUT /api/products/:id - update a product, optionally replacing its image (admin only)
// DELETE /api/products/:id - delete a product (admin only)
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;
