import { useEffect } from 'react';
import { SOCKET_EVENTS } from '../constants/config';

export const useSocketEvents = (socket, selectedUser, chat, users) => {
  useEffect(() => {
    if (!socket) return;
    
    const handleMessageNew = (message) => {
      if (selectedUser && message.senderId === selectedUser.id) {
        chat.addMessage(message);
        socket.emit('message:read', {
          messageId: message.id,
          senderId: message.senderId
        });
      }
      users.fetchUsers();
    };
    
    const handleMessageSent = (message) => {
      chat.addMessage(message);
      users.fetchUsers();
    };
    
    const handleMessageRead = ({ messageId }) => {
      chat.markMessageAsRead(messageId);
    };
    
    const handleTypingStart = ({ userId, username }) => {
      if (selectedUser && userId === selectedUser.id) {
        chat.setTypingUser(username);
      }
    };
    
    const handleTypingStop = ({ userId }) => {
      if (selectedUser && userId === selectedUser.id) {
        chat.setTypingUser(null);
      }
    };
    
    const handleUserStatus = ({ userId, isOnline, lastSeen }) => {
      users.updateUserStatus({ userId, isOnline, lastSeen });
      if (selectedUser && selectedUser.id === userId) {
        chat.setSelectedUser(prev => ({ ...prev, isOnline, lastSeen }));
      }
    };
    
    socket.on(SOCKET_EVENTS.MESSAGE_NEW, handleMessageNew);
    socket.on(SOCKET_EVENTS.MESSAGE_SENT, handleMessageSent);
    socket.on(SOCKET_EVENTS.MESSAGE_READ, handleMessageRead);
    socket.on(SOCKET_EVENTS.TYPING_START, handleTypingStart);
    socket.on(SOCKET_EVENTS.TYPING_STOP, handleTypingStop);
    socket.on(SOCKET_EVENTS.USER_STATUS, handleUserStatus);
    
    return () => {
      socket.off(SOCKET_EVENTS.MESSAGE_NEW, handleMessageNew);
      socket.off(SOCKET_EVENTS.MESSAGE_SENT, handleMessageSent);
      socket.off(SOCKET_EVENTS.MESSAGE_READ, handleMessageRead);
      socket.off(SOCKET_EVENTS.TYPING_START, handleTypingStart);
      socket.off(SOCKET_EVENTS.TYPING_STOP, handleTypingStop);
      socket.off(SOCKET_EVENTS.USER_STATUS, handleUserStatus);
    };
  }, [socket, selectedUser, chat, users]);
};
