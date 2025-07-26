const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, gender, age, role } = req.body;
    const user = new User({
      username,
      password,
      email,
      gender: gender || '',
      age: age || null,
      role: role || 'general'
    });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        gender: user.gender, 
        age: user.age, 
        role: user.role 
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    if (user.role === 'admin') {
      return res.status(200).json({
        message: 'Hi Admin',
        redirect: '/admin'
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        gender: user.gender, 
        age: user.age, 
        role: user.role 
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Change Password
router.post('/change-password', authMiddleware(), async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Validate input
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'กรุณากรอกรหัสผ่านปัจจุบันและรหัสผ่านใหม่' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร' });
    }

    // Check if new password is same as old password
    if (oldPassword === newPassword) {
      return res.status(400).json({ message: 'รหัสผ่านใหม่ต้องไม่เหมือนกับรหัสผ่านปัจจุบัน' });
    }

    // Find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'ไม่พบผู้ใช้นี้' });
    }

    // Verify old password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'เปลี่ยนรหัสผ่านสำเร็จแล้ว' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน' });
  }
});

// Get current user profile
router.get('/profile', authMiddleware(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      gender: user.gender,
      age: user.age,
      role: user.role,
      created_at: user.created_at
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;