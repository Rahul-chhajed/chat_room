const { User, Message } = require('../models');

class SocketHandlers {
  constructor(io) {
    this.io = io;
    this.connectedUsers = new Map();
  }

  handleConnection(socket) {
    console.log(`User ${socket.user.username} connected`);
    
    // Update user online status
    this.connectedUsers.set(socket.user._id.toString(), socket.id);
    this.updateUserOnlineStatus(socket.user._id, true);
    
    // Notify others about online status
    socket.broadcast.emit('user:status', {
      userId: socket.user._id,
      isOnline: true
    });

    // Set up event handlers
    socket.on('message:send', (data) => this.handleSendMessage(socket, data));
    socket.on('message:read', (data) => this.handleMarkAsRead(socket, data));
    socket.on('typing:start', (data) => this.handleTypingStart(socket, data));
    socket.on('typing:stop', (data) => this.handleTypingStop(socket, data));
    socket.on('disconnect', () => this.handleDisconnect(socket));
  }

  async handleSendMessage(socket, data) {
    try {
      const { receiverId, content } = data;
      
      const message = new Message({
        sender: socket.user._id,
        receiver: receiverId,
        content,
        delivered: this.connectedUsers.has(receiverId)
      });
      
      await message.save();
      
      const messageData = {
        id: message._id,
        content: message.content,
        timestamp: message.timestamp,
        senderId: socket.user._id,
        receiverId,
        delivered: message.delivered
      };
      
      // Send to receiver if online
      const receiverSocketId = this.connectedUsers.get(receiverId);
      if (receiverSocketId) {
        this.io.to(receiverSocketId).emit('message:new', {
          ...messageData,
          fromMe: false
        });
      }
      
      // Confirm to sender
      socket.emit('message:sent', {
        ...messageData,
        fromMe: true
      });
      
    } catch (error) {
      socket.emit('error', { message: 'Failed to send message' });
    }
  }

  async handleMarkAsRead(socket, data) {
    try {
      const { messageId, senderId } = data;
      await Message.findByIdAndUpdate(messageId, { read: true });
      
      const senderSocketId = this.connectedUsers.get(senderId);
      if (senderSocketId) {
        this.io.to(senderSocketId).emit('message:read', { messageId });
      }
    } catch (error) {
      console.error('Read receipt error:', error);
    }
  }

  handleTypingStart(socket, data) {
    const { receiverId } = data;
    const receiverSocketId = this.connectedUsers.get(receiverId);
    if (receiverSocketId) {
      this.io.to(receiverSocketId).emit('typing:start', {
        userId: socket.user._id,
        username: socket.user.username
      });
    }
  }

  handleTypingStop(socket, data) {
    const { receiverId } = data;
    const receiverSocketId = this.connectedUsers.get(receiverId);
    if (receiverSocketId) {
      this.io.to(receiverSocketId).emit('typing:stop', {
        userId: socket.user._id
      });
    }
  }

  async handleDisconnect(socket) {
    console.log(`User ${socket.user.username} disconnected`);
    this.connectedUsers.delete(socket.user._id.toString());
    
    await this.updateUserOnlineStatus(socket.user._id, false);
    
    socket.broadcast.emit('user:status', {
      userId: socket.user._id,
      isOnline: false,
      lastSeen: new Date()
    });
  }

  async updateUserOnlineStatus(userId, isOnline) {
    const updateData = { isOnline };
    if (!isOnline) {
      updateData.lastSeen = new Date();
    }
    await User.findByIdAndUpdate(userId, updateData);
  }
}

module.exports = SocketHandlers;
