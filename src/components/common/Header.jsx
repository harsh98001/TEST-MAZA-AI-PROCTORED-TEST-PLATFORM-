import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Code,
  Command,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Shield,
  Sun,
  Terminal,
  User,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROLES } from '../../utils/constants';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';

export function Header() {
  const {
    user,
    setUser,
    theme,
    toggleTheme,
    setIsCommandOpen,
    setIsSearchOpen,
    setIsRoleModalOpen,
    setIsAuthModalOpen,
    isMenuOpen,
    setIsMenuOpen,
    setCursorLabel,
    addToast,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser((prev) => ({
      ...prev,
      name: 'Guest Candidate',
      email: '',
      isAuthenticated: false,
    }));
    setShowProfileMenu(false);
    addToast('info', 'SESSION TERMINATED', 'Successfully signed out.');
  };

  const roleMeta = ROLES[user.role] || ROLES.Student;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-surface/90 backdrop-blur-md hairline-b shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity & Menu Trigger */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="group flex items-baseline space-x-2.5"
            onMouseEnter={() => setCursorLabel('HOME')}
            onMouseLeave={() => setCursorLabel('')}
          >
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-main group-hover:text-[#D64545] transition-colors">
              TEST MAZA
            </span>
            <span className="text-[10px] font-mono text-muted tracking-mono-label uppercase hidden sm:inline">
              [ ACADEMIC OS ]
            </span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={() => setCursorLabel('INDEX')}
            onMouseLeave={() => setCursorLabel('')}
            className="hidden md:flex items-center space-x-1.5 text-xs font-mono tracking-mono-label text-secondary hover:text-main transition-colors uppercase py-1 cursor-pointer"
            type="button"
          >
            {isMenuOpen ? <X size={13} /> : <Menu size={13} />}
            <span>INDEX</span>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-mono tracking-mono-label text-secondary uppercase">
          <Link
            to="/courses"
            className={`hover:text-main transition-colors ${
              location.pathname === '/courses' ? 'text-[#D64545] font-semibold' : ''
            }`}
          >
            01 / CURRICULA
          </Link>

          <Link
            to="/arena"
            className={`hover:text-main transition-colors flex items-center gap-1.5 ${
              location.pathname.startsWith('/arena') ? 'text-[#D64545] font-semibold' : ''
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D64545] animate-pulse" />
            <span>02 / THE ARENA</span>
          </Link>

          <Link
            to="/practice/web-development/phase-1"
            className="hover:text-main transition-colors"
          >
            03 / PRACTICE
          </Link>

          <Link
            to="/exam/web-development/phase-1"
            className="hover:text-main transition-colors flex items-center gap-1.5"
          >
            <Shield size={12} className="text-[#D64545]" />
            <span>04 / EXAM PROCTOR</span>
          </Link>

          <Link
            to="/review"
            className="hover:text-main transition-colors"
          >
            05 / SOLUTIONS
          </Link>
        </nav>

        {/* Right: Controls & Auth */}
        <div className="flex items-center space-x-3">
          {/* Quick Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            onMouseEnter={() => setCursorLabel('SEARCH')}
            onMouseLeave={() => setCursorLabel('')}
            className="flex items-center space-x-2 px-2.5 py-1.5 rounded border border-app bg-surface-raised text-xs font-mono text-secondary hover:border-[#D64545] hover:text-main transition-all cursor-pointer"
            title="Search Catalog"
            type="button"
          >
            <Search size={12} />
            <kbd className="text-[10px] text-muted font-bold hidden sm:inline">
              ⌘K
            </kbd>
          </button>

          {/* Role Indicator */}
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="hidden sm:flex items-center space-x-2 px-2.5 py-1.5 rounded border border-app bg-surface-raised text-[11px] font-mono text-secondary hover:text-main transition-all cursor-pointer"
            type="button"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
            <span className="uppercase">{user.role}</span>
          </button>

          {/* Supabase Auth */}
          {user.isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1.5 rounded border border-app bg-surface-raised hover:border-[#D64545] transition-all cursor-pointer"
                type="button"
              >
                <div className="w-6 h-6 rounded bg-[#D64545] text-white flex items-center justify-center text-[10px] font-mono font-bold uppercase">
                  {user.name.charAt(0)}
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 p-2 rounded border border-app bg-surface shadow-2xl font-mono text-xs z-50 space-y-1">
                  <div className="px-3 py-2 border-b border-app">
                    <p className="text-main font-medium truncate">{user.name}</p>
                    <p className="text-[10px] text-muted truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/performance"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-surface-raised text-secondary hover:text-main transition-colors"
                  >
                    <span>ANALYTICS & METRICS</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-surface-raised text-secondary hover:text-main transition-colors"
                  >
                    <span>SETTINGS</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded hover:bg-[#D64545]/15 text-[#D64545] transition-colors cursor-pointer text-left"
                    type="button"
                  >
                    <LogOut size={12} />
                    <span>SIGN OUT</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              onMouseEnter={() => setCursorLabel('AUTH')}
              onMouseLeave={() => setCursorLabel('')}
              className="px-3 py-1.5 rounded border border-app bg-surface hover:border-[#D64545] text-main font-mono text-xs tracking-mono-label uppercase font-medium flex items-center space-x-1.5 transition-all cursor-pointer"
              type="button"
            >
              <LogIn size={12} className="text-[#D64545]" />
              <span>AUTH</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded border border-app bg-surface hover:border-[#D64545] text-secondary hover:text-main transition-all cursor-pointer"
            type="button"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>
      </div>
    </header>
  );
}
