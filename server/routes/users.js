const express = require('express');
const { User, Message } = require('../models');
const { auth } = require('../middleware');

const router = express.Router();

// Get all users (except current user)
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select('username isOnline lastSeen');
    
    // Get last message for each user
    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { sender: req.user._id, receiver: user._id },
            { sender: user._id, receiver: req.user._id }
          ]
        }).sort({ timestamp: -1 });
        
        return {
          id: user._id,
          username: user.username,
          isOnline: user.isOnline,
          lastSeen: user.lastSeen,
          lastMessage: lastMessage ? {
            content: lastMessage.content,
            timestamp: lastMessage.timestamp,
            fromMe: lastMessage.sender.toString() === req.user._id.toString()
          } : null
        };
      })
    );
    
    res.json(usersWithLastMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
