import React, { useState, useEffect } from 'react';
import { AuthForm, Chat, LoadingSpinner, UserList } from './components';
import { useAuth, useSocket, useUsers, useChat, useSocketEvents } from './hooks';
import { VIEWS } from './constants/config';

function App() {
  const [currentView, setCurrentView] = useState(VIEWS.AUTH);
  
  // Custom hooks
  const auth = useAuth();
  const { socket, isConnecting, disconnectSocket } = useSocket(auth.token);
  const users = useUsers();
  const chat = useChat(socket);
  
  // Socket event handlers
  useSocketEvents(socket, chat.selectedUser, chat, users);

  // Handle successful socket connection
  useEffect(() => {
    if (socket) {
      users.fetchUsers();
      setCurrentView(VIEWS.HOME);
    }
  }, [socket]);

  // Navigation handlers
  const handleSelectUser = async (user) => {
    await chat.selectUser(user);
    setCurrentView(VIEWS.CHAT);
  };

  const handleGoBackToHome = () => {
    chat.clearChat();
    setCurrentView(VIEWS.HOME);
  };

  const handleLogout = () => {
    disconnectSocket();
    auth.logout();
    users.setUsers([]);
    chat.clearChat();
    setCurrentView(VIEWS.AUTH);
  };

  // Loading state
  if (isConnecting || (auth.token && !socket && currentView === VIEWS.AUTH)) {
    return <LoadingSpinner message="Connecting..." />;
  }

  // Auth screen
  if (!auth.token || currentView === VIEWS.AUTH) {
    return <AuthForm onSubmit={auth.handleAuth} isLoading={auth.isLoading} />;
  }

  // Home screen
  if (currentView === VIEWS.HOME) {
    return (
      <UserList 
        users={users.users}
        onSelectUser={handleSelectUser}
        user={auth.user}
        onLogout={handleLogout}
      />
    );
  }

  // Chat screen
  if (currentView === VIEWS.CHAT && chat.selectedUser) {
    return (
      <Chat 
        selectedUser={chat.selectedUser}
        messages={chat.messages}
        typingUser={chat.typingUser}
        newMessage={chat.newMessage}
        onGoBack={handleGoBackToHome}
        onMessageChange={chat.handleInputChange}
        onSendMessage={chat.sendMessage}
        onStopTyping={chat.stopTyping}
      />
    );
  }

  return null;
}

export default App;