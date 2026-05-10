import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, name: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setActiveUser, upsertUser } = useUserStore();

  useEffect(() => {
    const checkSession = async () => {
      const storedAuth = localStorage.getItem('quizify_auth');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        setUser(authData);
        setActiveUser(authData.id);
      }
      setIsLoading(false);
    };
    checkSession();
  }, [setActiveUser]);

  const login = async (email: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Simulate finding an existing user or creating a mock one
    const userId = `u-${email.split('@')[0]}`;
    const authData: AuthUser = {
      id: userId,
      email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
    };
    
    setUser(authData);
    localStorage.setItem('quizify_auth', JSON.stringify(authData));
    
    // Ensure user profile exists in userStore
    upsertUser(authData);
    setActiveUser(userId);
    
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const authData: AuthUser = {
      id: 'u-google-demo',
      email: 'demo@google.com',
      name: 'Google Explorer',
    };
    
    setUser(authData);
    localStorage.setItem('quizify_auth', JSON.stringify(authData));
    upsertUser(authData);
    setActiveUser(authData.id);
    
    setIsLoading(false);
  };

  const signup = async (email: string, name: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const userId = `u-${Date.now()}`;
    const authData: AuthUser = {
      id: userId,
      email,
      name,
    };
    
    setUser(authData);
    localStorage.setItem('quizify_auth', JSON.stringify(authData));
    upsertUser(authData);
    setActiveUser(userId);
    
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    setUser(null);
    localStorage.removeItem('quizify_auth');
    setActiveUser(null);
    
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, signup, logout }}>
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
