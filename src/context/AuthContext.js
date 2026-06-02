import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser } from '../api/authApi';
import API from '../api/axiosInstance';
import { isTokenExpired } from '../utils/jwtUtils';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  // Memoized logout to avoid ESLint exhaustive-deps warnings
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  // Validate stored token on mount / page refresh
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && isTokenExpired(storedToken)) {
      logout();
    }
  }, [logout]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      const receivedToken = res.data.token;
      // Backend returns role directly in login response
      let role = res.data.role || 'ROLE_USER';

      // If backend doesn't return role in login response,
      // try fetching from profile endpoint
      if (!res.data.role) {
        try {
          localStorage.setItem('token', receivedToken);
          const profileRes = await API.get('/api/auth/profile');
          role = profileRes.data?.role || 'ROLE_USER';
        } catch {
          // Profile endpoint not available, default to ROLE_USER
          role = 'ROLE_USER';
        }
      }

      localStorage.setItem('token', receivedToken);
      setToken(receivedToken);

      const userData = { email, role };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      toast.success('Welcome back!');
      return { success: true, role };
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Login failed';
      toast.error(typeof msg === 'string' ? msg : 'Login failed. Check your credentials.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      await registerUser({ name, email, password });
      toast.success('Account created! Please login.');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Registration failed';
      toast.error(typeof msg === 'string' ? msg : 'Registration failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const setRole = (role) => {
    if (!user) return;
    const updated = { ...user, role };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  const isAuthenticated = !!token && !isTokenExpired(token);
  const isAdmin = user?.role === 'ROLE_ADMIN';
  const isUser = user?.role === 'ROLE_USER';

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, register, logout, setRole, isAuthenticated, isAdmin, isUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
