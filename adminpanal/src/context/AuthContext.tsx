import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; name: string } | null>({
    email: 'tanmaypal626@gmail.com',
    name: 'Tanmay Pal'
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    // Auto-login for development
    setUser({ email: 'tanmaypal626@gmail.com', name: 'Tanmay Pal' });
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    // Auto-login on mount
    setUser({ email: 'tanmaypal626@gmail.com', name: 'Tanmay Pal' });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
