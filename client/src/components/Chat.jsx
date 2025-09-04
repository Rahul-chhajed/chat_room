import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const Chat = ({ 
  selectedUser, 
  messages, 
  typingUser,
  newMessage,
  onGoBack,
  onMessageChange,
  onSendMessage,
  onStopTyping
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <ChatHeader selectedUser={selectedUser} onGoBack={onGoBack} />
      <MessageList 
        messages={messages} 
        selectedUser={selectedUser} 
        typingUser={typingUser} 
      />
      <MessageInput 
        newMessage={newMessage}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
        onStopTyping={onStopTyping}
      />
    </div>
  );
};

export default Chat;
