const { authRoutes, usersRoutes, conversationsRoutes } = require('../routes');

const setupRoutes = (app) => {
  // Authentication routes
  app.use('/auth', authRoutes);
  
  // User routes
  app.use('/users', usersRoutes);
  
  // Conversation routes
  app.use('/conversations', conversationsRoutes);
};

module.exports = setupRoutes;
