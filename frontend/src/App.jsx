import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import Profile from './pages/Profile';
import TutorDashboard from './pages/TutorDashboard';
import StudentsPage from './pages/StudentsPage';
import SessionsPage from './pages/SessionsPage';

function AppRoutes() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to={user.role === 'tutor' ? '/tutor' : '/dashboard'} /> : <Landing />} />
        <Route path="/login" element={user ? <Navigate to={user.role === 'tutor' ? '/tutor' : '/dashboard'} /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute role="student"><Profile /></ProtectedRoute>} />
        <Route path="/tutor" element={<ProtectedRoute role="tutor"><TutorDashboard /></ProtectedRoute>} />
        <Route path="/tutor/students" element={<ProtectedRoute role="tutor"><StudentsPage /></ProtectedRoute>} />
        <Route path="/tutor/sessions" element={<ProtectedRoute role="tutor"><SessionsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' },
            success: { iconTheme: { primary: '#d4a017', secondary: '#000' } },
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
