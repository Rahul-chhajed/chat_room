import { useState, useRef, useCallback } from 'react';
import { messagesAPI } from '../utils/api';
import { TYPING_TIMEOUT } from '../constants/config';

export const useChat = (socket) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  
  const typingTimeoutRef = useRef(null);

  const fetchMessages = useCallback(async (userId) => {
    try {
      const data = await messagesAPI.getConversation(userId);
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      setMessages([]);
    }
  }, []);

  const selectUser = useCallback(async (user) => {
    setSelectedUser(user);
    setMessages([]);
    setTypingUser(null);
    await fetchMessages(user.id);
  }, [fetchMessages]);

  const sendMessage = useCallback((e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || !socket) return;
    
    socket.emit('message:send', {
      receiverId: selectedUser.id,
      content: newMessage.trim()
    });
    
    setNewMessage('');
    stopTyping();
  }, [newMessage, selectedUser, socket]);

  const startTyping = useCallback(() => {
    if (!isTyping && selectedUser && socket) {
      setIsTyping(true);
      socket.emit('typing:start', { receiverId: selectedUser.id });
    }
    
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(stopTyping, TYPING_TIMEOUT);
  }, [isTyping, selectedUser, socket]);

  const stopTyping = useCallback(() => {
    if (isTyping && selectedUser && socket) {
      setIsTyping(false);
      socket.emit('typing:stop', { receiverId: selectedUser.id });
    }
    clearTimeout(typingTimeoutRef.current);
  }, [isTyping, selectedUser, socket]);

  const handleInputChange = useCallback((e) => {
    setNewMessage(e.target.value);
    startTyping();
  }, [startTyping]);

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const markMessageAsRead = useCallback((messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  }, []);

  const clearChat = useCallback(() => {
    setSelectedUser(null);
    setMessages([]);
    setTypingUser(null);
    setNewMessage('');
  }, []);

  return {
    selectedUser,
    messages,
    newMessage,
    isTyping,
    typingUser,
    setSelectedUser,
    setMessages,
    setTypingUser,
    selectUser,
    sendMessage,
    handleInputChange,
    stopTyping,
    addMessage,
    markMessageAsRead,
    clearChat
  };
};
