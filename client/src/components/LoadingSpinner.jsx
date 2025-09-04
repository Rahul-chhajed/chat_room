import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-white rounded-full animate-spin"></div>
        <p className="text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
