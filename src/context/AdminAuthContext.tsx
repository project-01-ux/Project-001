import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
  loginError: string | null;
}

const ADMIN_USERNAME = 'project-001';
const ADMIN_PASSWORD = 'Mady@608';
const AUTH_KEY = 'vegas_companions_admin_session';

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdminLoggedIn: false,
  login: () => false,
  logout: () => {},
  loginError: null
});

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const session = localStorage.getItem(AUTH_KEY);
    if (session === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const login = (u: string, p: string): boolean => {
    if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAdminLoggedIn(true);
      setLoginError(null);
      return true;
    } else {
      setLoginError('Invalid admin username or password');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAdminLoggedIn(false);
    setLoginError(null);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, login, logout, loginError }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
