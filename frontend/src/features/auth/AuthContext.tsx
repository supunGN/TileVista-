'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserSession {
  id: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: UserSession | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent admin session on mount
    const savedToken = localStorage.getItem('tilevista_admin_token');
    const savedUser = localStorage.getItem('tilevista_admin_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass }),
      });

      if (!response.ok) {
        setIsLoading(false);
        return false;
      }

      const data = await response.json();
      const token = data.access_token;
      const userPayload: UserSession = data.user;

      localStorage.setItem('tilevista_admin_token', token);
      localStorage.setItem('tilevista_admin_user', JSON.stringify(userPayload));

      setToken(token);
      setUser(userPayload);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('tilevista_admin_token');
    localStorage.removeItem('tilevista_admin_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;
