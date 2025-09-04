import React, { useRef, useEffect } from 'react';
import { formatTime } from '../utils/timeUtils';

const MessageList = ({ messages, selectedUser, typingUser }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (messages.length === 0) {
    return <EmptyMessageList selectedUser={selectedUser} />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <MessageItem key={message.id} message={message} index={index} />
          ))}
          
          {typingUser && <TypingIndicator typingUser={typingUser} />}
        </div>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

const MessageItem = ({ message, index }) => {
  return (
    <div
      className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className={`group max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] ${
        message.fromMe 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
          : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
      }`}>
        <p className="break-words">{message.content}</p>
        <div className="flex items-center justify-between mt-2">
          <span className={`text-xs ${
            message.fromMe ? 'text-purple-100' : 'text-purple-300'
          }`}>
            {formatTime(message.timestamp)}
          </span>
          {message.fromMe && <MessageStatus message={message} />}
        </div>
      </div>
    </div>
  );
};

const MessageStatus = ({ message }) => {
  if (message.read) {
    return (
      <div className="flex items-center ml-2">
        <div className="flex text-purple-100">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <svg className="w-4 h-4 -ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  }
  
  if (message.delivered) {
    return (
      <div className="flex items-center ml-2">
        <svg className="w-4 h-4 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }
  
  return (
    <div className="flex items-center ml-2">
      <div className="w-4 h-4 border-2 border-purple-200 rounded-full border-dashed animate-spin"></div>
    </div>
  );
};

const TypingIndicator = ({ typingUser }) => (
  <div className="flex justify-start animate-fade-in">
    <div className="bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-2xl border border-white/20">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <span className="text-sm text-purple-300">{typingUser} is typing</span>
      </div>
    </div>
  </div>
);

const EmptyMessageList = ({ selectedUser }) => (
  <div className="flex-1 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">💬</span>
      </div>
      <p className="text-white text-lg font-medium mb-2">Start a conversation</p>
      <p className="text-purple-300">Send a message to {selectedUser.username}</p>
    </div>
  </div>
);

export default MessageList;
