import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Factory, AuthContextType } from '@/types/auth';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [factory, setFactory] = useState<Factory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    const factoryData = localStorage.getItem('factory_data');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        if (factoryData) {
          setFactory(JSON.parse(factoryData));
        }
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('factory_data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await api.login(email, password);
      
      // Store auth data
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
      if (response.factory) {
        localStorage.setItem('factory_data', JSON.stringify(response.factory));
        setFactory(response.factory);
      }
      
      setUser(response.user);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${response.user.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('factory_data');
    setUser(null);
    setFactory(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const value: AuthContextType = {
    user,
    factory,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};