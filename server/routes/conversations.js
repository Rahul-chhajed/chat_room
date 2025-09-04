const express = require('express');
const { Message } = require('../models');
const { auth } = require('../middleware');

const router = express.Router();

// Get messages for a conversation
router.get('/:userId/messages', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort({ timestamp: 1 });
    
    // Mark messages as read
    await Message.updateMany(
      { sender: userId, receiver: req.user._id, read: false },
      { read: true }
    );
    
    res.json(messages.map(msg => ({
      id: msg._id,
      content: msg.content,
      timestamp: msg.timestamp,
      fromMe: msg.sender.toString() === req.user._id.toString(),
      read: msg.read,
      delivered: msg.delivered
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
