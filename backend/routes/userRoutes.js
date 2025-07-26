// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password'); // ไม่ส่ง password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;