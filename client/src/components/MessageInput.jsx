import React from 'react';

const MessageInput = ({ 
  newMessage, 
  onMessageChange, 
  onSendMessage, 
  onStopTyping 
}) => {
  return (
    <div className="backdrop-blur-sm bg-white/10 border-t border-white/10 p-4">
      <form onSubmit={onSendMessage} className="max-w-4xl mx-auto">
        <div className="flex space-x-3 items-end">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={onMessageChange}
              onBlur={onStopTyping}
              placeholder="Type your message..."
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 pr-12"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-purple-300">✨</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
