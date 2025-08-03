const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin:  process.env.CLIENT_URL,
  credentials: true, // allow credentials like tokens/cookies
}));
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes'); // ✅ This should exist
app.use('/api/users', userRoutes);

// Start Server
const startServer = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('❌ MONGO_URI is not defined in .env file');
    process.exit(1);
  }

  try {
    console.log('🔌 Connecting to:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB Connected');

    app.listen(5000, () => {
      console.log('🚀 Server running on http://localhost:5000');
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

startServer();
