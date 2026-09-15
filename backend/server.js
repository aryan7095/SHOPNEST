const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables from .env
dotenv.config();
// Connect to MongoDB before handling any requests
connectDB();

const app = express();

// Set CORS for frontend URL / allow single-node deploy
// Allows requests from local dev URLs and the deployed frontend URL (via env var),
// and permits cookies/credentials to be sent cross-origin
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
  credentials: true
}));

// Parses incoming JSON request bodies (req.body)
app.use(express.json());

// Mount API route modules under their respective base paths
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Serve frontend in production
// In production, serve the built React app as static files, and send index.html
// for any unmatched route so client-side routing (React Router) can take over
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  // In development, just confirm the API is running (frontend is served separately, e.g. via Vite)
  app.get('/', (req, res) => {
    res.send('ShopNest API is running in Development mode...');
  });
}

// Start the server, using the port from env vars or defaulting to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
