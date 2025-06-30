const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username is required'], 
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    trim: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email']
  },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other', ''], 
    default: ''
  },
  age: { 
    type: Number, 
    min: [0, 'Age cannot be negative'], 
    max: [120, 'Age cannot exceed 120'],
    default: null
  },
  role: { 
    type: String, 
    enum: ['general', 'pro'], 
    default: 'general' 
  },
  created_at: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);