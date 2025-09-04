const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Import modules
const connectDB = require('./config/database');
const { PORT, CLIENT_URL } = require('./config/config');
const { setupMiddleware, setupRoutes } = require('./utils');
const setupSocket = require('./socket');

// Initialize app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: CLIENT_URL, credentials: true }
});

// Connect to database
connectDB();

// Setup middleware
setupMiddleware(app);

// Setup routes
setupRoutes(app);

// Setup socket.io
setupSocket(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});