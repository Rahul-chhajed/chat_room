import { API_URL } from '../constants/config';

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const authAPI = {
  login: (credentials) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
  
  register: (credentials) => 
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
};

export const usersAPI = {
  getAll: () => apiRequest('/users')
};

export const messagesAPI = {
  getConversation: (userId) => apiRequest(`/conversations/${userId}/messages`)
};
