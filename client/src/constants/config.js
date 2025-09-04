export const API_URL = 'http://localhost:5000';

export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  CONNECT_ERROR: 'connect_error',
  MESSAGE_NEW: 'message:new',
  MESSAGE_SENT: 'message:sent',
  MESSAGE_READ: 'message:read',
  TYPING_START: 'typing:start',
  TYPING_STOP: 'typing:stop',
  USER_STATUS: 'user:status'
};

export const VIEWS = {
  AUTH: 'auth',
  HOME: 'home',
  CHAT: 'chat'
};

export const TYPING_TIMEOUT = 2000;
