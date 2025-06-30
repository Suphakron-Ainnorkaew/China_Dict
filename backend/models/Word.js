const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  chinese: { type: String, required: true },
  pinyin: { type: String, required: true },
  thai_pronunciation: { type: String, required: true },
  thai_meaning: { type: String, required: true },
  part_of_speech: { type: String, required: true },
  category: { type: String, default: 'general' },
  example_usage: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Word', wordSchema);