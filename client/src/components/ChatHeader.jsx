import React from 'react';

const ChatHeader = ({ selectedUser, onGoBack }) => {
  return (
    <div className="backdrop-blur-sm bg-white/10 shadow-lg border-b border-white/10 px-4 py-3">
      <div className="flex items-center space-x-4 max-w-4xl mx-auto">
        <button
          onClick={onGoBack}
          className="text-purple-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
            {selectedUser.username[0].toUpperCase()}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-lg ${
            selectedUser.isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
          }`}></div>
        </div>
        
        <div className="flex-1">
          <h2 className="font-bold text-white text-lg">{selectedUser.username}</h2>
          <p className="text-sm text-purple-300">
            {selectedUser.isOnline ? (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Online
              </span>
            ) : (
              `Last seen ${new Date(selectedUser.lastSeen).toLocaleDateString()}`
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
