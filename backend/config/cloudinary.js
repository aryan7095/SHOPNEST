const cloudinary = require('cloudinary').v2;
// Load environment variables (CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET) from .env
require('dotenv').config();

// Configure the Cloudinary SDK with credentials from environment variables,
// so it can be used elsewhere (e.g. for uploading/serving event images)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
