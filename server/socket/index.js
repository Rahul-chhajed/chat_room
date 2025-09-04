const socketAuth = require('./auth');
const SocketHandlers = require('./handlers');

const setupSocket = (io) => {
  // Authentication middleware
  io.use(socketAuth);
  
  // Create handlers instance
  const handlers = new SocketHandlers(io);
  
  // Handle connections
  io.on('connection', (socket) => {
    handlers.handleConnection(socket);
  });
};

module.exports = setupSocket;
