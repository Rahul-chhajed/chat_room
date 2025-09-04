import { useState, useCallback } from 'react';
import { usersAPI } from '../utils/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const data = await usersAPI.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, []);

  const updateUserStatus = useCallback(({ userId, isOnline, lastSeen }) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isOnline, lastSeen } : user
    ));
  }, []);

  return {
    users,
    setUsers,
    fetchUsers,
    updateUserStatus
  };
};
