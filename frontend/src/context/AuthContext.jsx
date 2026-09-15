import React, { createContext, useState } from 'react';

// Create the context object that will hold auth state and functions
export const AuthContext = createContext();

// Provider component that wraps the app and supplies auth state/functions to all children
export const AuthProvider = ({ children }) => {
  // Initialize user state directly from localStorage (if present), so a page refresh
  // doesn't momentarily show a logged-out state before an effect runs
  const [user, setUser] = useState(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  );

  // Stores the logged-in user's data (already fetched/authenticated elsewhere,
  // e.g. by a Login page calling the API directly) and persists it to localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  // Logs the user out by clearing state and removing persisted session data
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    // Expose auth state and functions to all descendant components via context
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
