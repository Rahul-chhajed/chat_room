import { useState } from 'react';
import { authAPI } from '../utils/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e, isLogin = true) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const credentials = {
      username: formData.get('username'),
      password: formData.get('password')
    };
    
    try {
      const data = isLogin 
        ? await authAPI.login(credentials)
        : await authAPI.register(credentials);
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return {
    user,
    token,
    isLoading,
    setUser,
    handleAuth,
    logout
  };
};
