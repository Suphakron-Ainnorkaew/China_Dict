require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('MONGODB_URI:', uri); // Debug
    if (!uri) {
      throw new Error('MONGODB_URI is not defined');
    }
    await mongoose.connect(uri);
    console.log('MongoDB connected to database:', mongoose.connection.db.databaseName); // Debug database name
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;