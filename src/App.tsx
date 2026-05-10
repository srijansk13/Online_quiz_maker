import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { CommandPalette } from './components/ui/CommandPalette';

// Lazy load pages for better performance
const Login = React.lazy(() => import('./pages/auth/Login').then(module => ({ default: module.Login })));
const Signup = React.lazy(() => import('./pages/auth/Signup').then(module => ({ default: module.Signup })));

// Placeholder components for routing
const Landing = React.lazy(() => import('./pages/Landing').then(module => ({ default: module.Landing })));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard').then(module => ({ default: module.Dashboard })));
const CreateQuiz = React.lazy(() => import('./pages/dashboard/CreateQuiz').then(module => ({ default: module.CreateQuiz })));

const Discover = React.lazy(() => import('./pages/discover/Discover').then(module => ({ default: module.Discover })));
const QuizDetails = React.lazy(() => import('./pages/discover/QuizDetails').then(module => ({ default: module.QuizDetails })));
const QuizPlayer = React.lazy(() => import('./pages/player/QuizPlayer').then(module => ({ default: module.QuizPlayer })));
const Results = React.lazy(() => import('./pages/player/Results').then(module => ({ default: module.Results })));
const Leaderboard = React.lazy(() => import('./pages/dashboard/Leaderboard').then(module => ({ default: module.Leaderboard })));
const Settings = React.lazy(() => import('./pages/dashboard/Settings').then(module => ({ default: module.Settings })));

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark-900 font-sans text-white selection:bg-brand-500/30 selection:text-brand-100">
          <CommandPalette />
          <React.Suspense fallback={<div className="flex h-screen items-center justify-center bg-dark-900"><div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" /></div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/quiz/:id" element={<QuizDetails />} />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/create" 
                element={
                  <ProtectedRoute>
                    <CreateQuiz />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/leaderboard" 
                element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/play/:id" 
                element={
                  <ProtectedRoute>
                    <QuizPlayer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/results" 
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </React.Suspense>
          <Toaster 
            position="top-right"
            toastOptions={{
              className: '!bg-dark-800 !text-white !border !border-white/10 !shadow-xl',
              duration: 4000,
            }} 
          />
        </div>
      </Router>
    </AuthProvider>
  );
}
