import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute, UserRoute } from './routes/ProtectedRoutes';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import UnauthorizedPage from './pages/public/UnauthorizedPage';

// User Pages
import HomePage from './pages/user/HomePage';
import MoviesPage from './pages/user/MoviesPage';
import MovieDetailPage from './pages/user/MovieDetailPage';
import WatchPage from './pages/user/WatchPage';
import ProfilePage from './pages/user/ProfilePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMoviesPage from './pages/admin/AdminMoviesPage';
import AddMoviePage from './pages/admin/AddMoviePage';
import EditMoviePage from './pages/admin/EditMoviePage';

import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#16161f',
              color: '#f0f0f5',
              border: '1px solid rgba(255,255,255,0.07)',
              fontFamily: "'DM Sans', sans-serif",
            },
            success: { iconTheme: { primary: '#1ce8b5', secondary: '#0a0a0f' } },
            error: { iconTheme: { primary: '#ff4d6d', secondary: '#0a0a0f' } },
          }}
        />
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* User Routes */}
          <Route element={<UserLayout />}>
            <Route path="/home" element={<UserRoute><HomePage /></UserRoute>} />
            <Route path="/movies" element={<UserRoute><MoviesPage /></UserRoute>} />
            <Route path="/movie/:id" element={<UserRoute><MovieDetailPage /></UserRoute>} />
            <Route path="/watch/:id" element={<UserRoute><WatchPage /></UserRoute>} />
            <Route path="/profile" element={<UserRoute><ProfilePage /></UserRoute>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="movies" element={<AdminRoute><AdminMoviesPage /></AdminRoute>} />
            <Route path="add-movie" element={<AdminRoute><AddMoviePage /></AdminRoute>} />
            <Route path="edit-movie/:id" element={<AdminRoute><EditMoviePage /></AdminRoute>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
