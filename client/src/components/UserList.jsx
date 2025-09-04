import React from 'react';
import { formatTime } from '../utils/timeUtils';

const UserList = ({ users, onSelectUser, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="backdrop-blur-sm bg-white/10 shadow-lg border-b border-white/10 px-6 py-4">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <p className="text-purple-200 text-sm">Stay connected with your friends</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{user?.username?.[0]?.toUpperCase()}</span>
              </div>
              <span className="text-white text-sm">{user?.username}</span>
            </div>
            <button
              onClick={onLogout}
              className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-2">
          {users.map((user, index) => (
            <UserItem 
              key={user.id}
              user={user}
              index={index}
              onSelect={onSelectUser}
            />
          ))}
        </div>
        
        {users.length === 0 && <EmptyUserList />}
      </div>
    </div>
  );
};

const UserItem = ({ user, index, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(user)}
      style={{ animationDelay: `${index * 0.1}s` }}
      className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 rounded-2xl p-4 cursor-pointer border border-white/10 hover:border-white/30 hover:shadow-xl hover:scale-[1.02] animate-fade-in-up group"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {user.username[0].toUpperCase()}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-white shadow-lg transition-all duration-300 ${
            user.isOnline 
              ? 'bg-green-400 animate-pulse' 
              : 'bg-gray-400'
          }`}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-white text-lg truncate group-hover:text-purple-200 transition-colors">
              {user.username}
            </h3>
            {user.lastMessage && (
              <span className="text-xs text-purple-300 bg-white/10 px-2 py-1 rounded-full">
                {formatTime(user.lastMessage.timestamp)}
              </span>
            )}
          </div>
          
          {user.lastMessage ? (
            <p className="text-purple-200 text-sm truncate">
              <span className={user.lastMessage.fromMe ? 'text-purple-300' : ''}>
                {user.lastMessage.fromMe ? 'You: ' : ''}
              </span>
              {user.lastMessage.content}
            </p>
          ) : (
            <p className="text-purple-300 text-sm italic">Start a conversation</p>
          )}
          
          {!user.isOnline && (
            <p className="text-xs text-purple-400 mt-1">
              Last seen {new Date(user.lastSeen).toLocaleDateString()}
            </p>
          )}
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const EmptyUserList = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-4xl">👥</span>
    </div>
    <p className="text-white text-lg font-medium mb-2">No users yet</p>
    <p className="text-purple-300">Invite friends to start chatting</p>
  </div>
);

export default UserList;
