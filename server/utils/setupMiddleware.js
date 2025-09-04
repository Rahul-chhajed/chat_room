const express = require('express');
const cors = require('cors');
const { CLIENT_URL } = require('../config/config');

const setupMiddleware = (app) => {
  // CORS
  app.use(cors({ 
    origin: CLIENT_URL, 
    credentials: true 
  }));
  
  // JSON parsing
  app.use(express.json());
};

module.exports = setupMiddleware;
