const express = require('express');
const router = express.Router();
const Word = require('../models/Word');
const authMiddleware = require('../middleware/auth');

// Get all words with pagination (admin only)
router.get('/',async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const words = await Word.find().skip(skip).limit(limit);
    const total = await Word.countDocuments();
    res.json({ words, total, page, limit });
  } catch (error) {
    console.error('Error fetching words:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get word by ID (admin only)
router.get('/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (word) {
      res.json(word);
    } else {
      res.status(404).json({ message: 'Word not found' });
    }
  } catch (error) {
    console.error('Error fetching word by ID:', error);
    res.status(500).json({ message: error.message });
  }
});

// Search words (admin only)
router.get('/search/:query', authMiddleware(['admin']), async (req, res) => {
  try {
    const words = await Word.find({
      $or: [
        { chinese: { $regex: req.params.query, $options: 'i' } },
        { pinyin: { $regex: req.params.query, $options: 'i' } },
        { thai_meaning: { $regex: req.params.query, $options: 'i' } }
      ]
    });
    res.json(words);
  } catch (error) {
    console.error('Error searching words:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add new word (admin only)
router.post('/addwords', authMiddleware(['admin']), async (req, res) => {
  try {
    const word = new Word({
      chinese: req.body.chinese,
      pinyin: req.body.pinyin,
      thai_pronunciation: req.body.thai_pronunciation,
      thai_meaning: req.body.thai_meaning,
      part_of_speech: req.body.part_of_speech,
      example_usage: req.body.example_usage || []
    });
    const newWord = await word.save();
    res.status(201).json(newWord);
  } catch (error) {
    console.error('Error adding word:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update word by ID (admin only)
router.put('/Editwords/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (word) {
      word.chinese = req.body.chinese || word.chinese;
      word.pinyin = req.body.pinyin || word.pinyin;
      word.thai_pronunciation = req.body.thai_pronunciation || word.thai_pronunciation;
      word.thai_meaning = req.body.thai_meaning || word.thai_meaning;
      word.part_of_speech = req.body.part_of_speech || word.part_of_speech;
      word.example_usage = req.body.example_usage || word.example_usage;
      word.updated_at = Date.now();
      const updatedWord = await word.save();
      res.json(updatedWord);
    } else {
      res.status(404).json({ message: 'Word not found' });
    }
  } catch (error) {
    console.error('Error updating word:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete word by ID (admin only)
router.delete('/Deletewords/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (word) {
      await word.deleteOne();
      res.json({ message: 'Word deleted' });
    } else {
      res.status(404).json({ message: 'Word not found' });
    }
  } catch (error) {
    console.error('Error deleting word:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;