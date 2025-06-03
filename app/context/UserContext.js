'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Try to get user from localStorage on initial load
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [loading, setLoading] = useState(!user); // If user in localStorage, no need to load
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('/api/user/user-details', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.error || 'Failed to fetch user details');
      }

      const result = await response.json();

      if (!result?.data) {
        throw new Error('No user found');
      }

      setUser(result.data);
      localStorage.setItem('user', JSON.stringify(result.data)); // Save to localStorage
    } catch (err) {
      // console.error('user fetch error:', err);
      setError(err.message || 'Something went wrong');
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if user not in localStorage
    if (!user) {
      fetchUserDetails();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
