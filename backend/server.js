const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const wordRoutes = require('./routes/wordRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'https://china-dict.onrender.com',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Chinese-Thai Dictionary API' });
});
app.use('/api/words', wordRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));