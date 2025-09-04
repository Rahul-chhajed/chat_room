const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const { User } = require('../models');

const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error('User not found');
    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
};

module.exports = socketAuth;
