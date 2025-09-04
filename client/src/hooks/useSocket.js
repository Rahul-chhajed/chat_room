import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { API_URL, SOCKET_EVENTS } from '../constants/config';

export const useSocket = (token) => {
  const [socket, setSocket] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (token && !socket && !isConnecting) {
      setIsConnecting(true);
      const newSocket = io(API_URL, {
        auth: { token }
      });
      
      newSocket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log('Connected to server');
        setSocket(newSocket);
        setIsConnecting(false);
      });
      
      newSocket.on(SOCKET_EVENTS.CONNECT_ERROR, () => {
        console.error('Connection failed');
        setIsConnecting(false);
      });
      
      return () => {
        newSocket.close();
      };
    }
  }, [token, socket, isConnecting]);

  const disconnectSocket = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
    setIsConnecting(false);
  };

  return {
    socket,
    isConnecting,
    disconnectSocket
  };
};
