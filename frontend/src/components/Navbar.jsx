import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Crown, LogOut, User, LayoutDashboard, Users, CalendarDays, Menu, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLink = (to, label, Icon) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive(to)
          ? 'bg-gold-600/20 text-gold-400'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
    >
      <Icon size={16} />
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Crown className="text-gold-500" size={24} />
          <span className="font-display font-bold text-lg text-white">
            Chess<span className="gold-gradient">Academy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        {user && (
          <div className="hidden md:flex items-center gap-1">
            {user.role === 'student' && (
              <>
                {navLink('/dashboard', 'Dashboard', LayoutDashboard)}
                {navLink('/profile', 'Profile', User)}
              </>
            )}
            {user.role === 'tutor' && (
              <>
                {navLink('/tutor', 'Dashboard', LayoutDashboard)}
                {navLink('/tutor/students', 'Students', Users)}
                {navLink('/tutor/sessions', 'Sessions', CalendarDays)}
              </>
            )}
          </div>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-gray-400">
                {user.full_name.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn-outline py-2 px-4 text-sm">Login</Link>
              <Link to="/register" className="btn-gold py-2 px-4 text-sm">Register</Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          {user && (
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && user && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-3 flex flex-col gap-1">
          {user.role === 'student' && (
            <>
              {navLink('/dashboard', 'Dashboard', LayoutDashboard)}
              {navLink('/profile', 'Profile', User)}
            </>
          )}
          {user.role === 'tutor' && (
            <>
              {navLink('/tutor', 'Dashboard', LayoutDashboard)}
              {navLink('/tutor/students', 'Students', Users)}
              {navLink('/tutor/sessions', 'Sessions', CalendarDays)}
            </>
          )}
        </div>
      )}
    </nav>
  );
}
