import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isLoading }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl">💬</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">ChatFlow</h2>
            <p className="text-purple-200">Connect instantly with anyone</p>
          </div>
          
          <form onSubmit={(e) => onSubmit(e, isLogin)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  disabled={isLoading}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter your username"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  disabled={isLoading}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 disabled:opacity-50"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
            
            <div className="text-center">
              <p className="text-purple-200 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  disabled={isLoading}
                  className="text-purple-300 hover:text-white font-semibold transition-colors disabled:opacity-50"
                >
                  {isLogin ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
