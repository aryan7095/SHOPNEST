const mongoose = require('mongoose');

// Establishes a connection to MongoDB using the URI from environment variables.
// Called once at server startup.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If the connection fails, log the error and exit the process,
    // since the app can't function without a database connection
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
