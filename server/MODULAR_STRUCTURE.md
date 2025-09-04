# Chat App Server - Modular Structure

This server has been refactored into a modular structure for better maintainability, scalability, and code organization.

## Project Structure

```
server/
├── config/
│   ├── config.js          # Application configuration
│   └── database.js        # Database connection setup
├── models/
│   ├── index.js           # Model exports
│   ├── User.js            # User model
│   └── Message.js         # Message model
├── middleware/
│   ├── index.js           # Middleware exports
│   └── auth.js            # Authentication middleware
├── routes/
│   ├── index.js           # Route exports
│   ├── auth.js            # Authentication routes
│   ├── users.js           # User-related routes
│   └── conversations.js   # Conversation/message routes
├── socket/
│   ├── index.js           # Socket setup
│   ├── auth.js            # Socket authentication
│   └── handlers.js        # Socket event handlers
├── utils/
│   ├── index.js           # Utility exports
│   ├── setupMiddleware.js # Express middleware setup
│   └── setupRoutes.js     # Route setup
├── index.js               # Main application entry point
└── package.json
```

## Module Breakdown

### Config (`/config`)
- **config.js**: Central configuration file for environment variables and constants
- **database.js**: MongoDB connection setup and configuration

### Models (`/models`)
- **User.js**: User schema and model definition
- **Message.js**: Message schema and model definition
- **index.js**: Exports all models for easy importing

### Middleware (`/middleware`)
- **auth.js**: JWT authentication middleware for protecting routes
- **index.js**: Exports all middleware functions

### Routes (`/routes`)
- **auth.js**: Authentication endpoints (register, login)
- **users.js**: User-related endpoints (get users list)
- **conversations.js**: Message/conversation endpoints
- **index.js**: Exports all route modules

### Socket (`/socket`)
- **auth.js**: Socket.IO authentication middleware
- **handlers.js**: Socket event handlers class with all real-time functionality
- **index.js**: Socket.IO setup and configuration

### Utils (`/utils`)
- **setupMiddleware.js**: Express middleware configuration
- **setupRoutes.js**: Route mounting and organization
- **index.js**: Exports utility functions

## Key Features of the Modular Structure

1. **Separation of Concerns**: Each module has a specific responsibility
2. **Easy Testing**: Individual modules can be tested in isolation
3. **Better Maintainability**: Changes to one module don't affect others
4. **Scalability**: Easy to add new features by adding new modules
5. **Reusability**: Modules can be reused across different parts of the application

## Environment Variables

Create a `.env` file in the server directory with:

```env
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your-secret-key
PORT=5000
CLIENT_URL=http://localhost:5173
```

## Usage

The main `index.js` file orchestrates all modules:

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Import modules
const connectDB = require('./config/database');
const { PORT, CLIENT_URL } = require('./config/config');
const { setupMiddleware, setupRoutes } = require('./utils');
const setupSocket = require('./socket');

// Initialize and configure app
// Connect to database
// Setup middleware, routes, and socket.io
// Start server
```

This modular approach makes the codebase much more maintainable and follows Node.js best practices for organizing Express applications.
