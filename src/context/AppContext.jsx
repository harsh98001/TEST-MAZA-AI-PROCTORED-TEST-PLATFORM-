import { createContext, useContext, useState, useEffect } from 'react';
import { courses as masterCourses } from '../data/courses';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import {
  ROLES,
  STORAGE_KEYS,
  DEFAULT_SETTINGS,
  INITIAL_ACTIVITY,
} from '../utils/constants';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // 1. User & Role State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Guest Candidate',
            email: '',
            role: 'Student',
            avatar: '',
            regNumber: '',
            isAuthenticated: false,
          };
    } catch {
      return {
        name: 'Guest Candidate',
        email: '',
        role: 'Student',
        avatar: '',
        regNumber: '',
        isAuthenticated: false,
      };
    }
  });

  // 2. Global Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, message) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [{ id, type, title, message }, ...prev]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Check Supabase session on mount and listen to magic links / OTP confirmations
  useEffect(() => {
    try {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const verifiedName =
            session.user.user_metadata?.full_name ||
            session.user.email?.split('@')[0] ||
            'Candidate';
          setUser((prev) => ({
            ...prev,
            email: session.user.email,
            name: verifiedName,
            isAuthenticated: true,
          }));
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          const verifiedName =
            session.user.user_metadata?.full_name ||
            session.user.email?.split('@')[0] ||
            'Candidate';
          setUser((prev) => ({
            ...prev,
            email: session.user.email,
            name: verifiedName,
            isAuthenticated: true,
          }));

          if (event === 'SIGNED_IN') {
            addToast('success', 'EMAIL CONFIRMED', `Authenticated as ${session.user.email}.`);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser((prev) => ({
            ...prev,
            name: 'Guest Candidate',
            email: '',
            isAuthenticated: false,
          }));
        }
      });

      return () => subscription.unsubscribe();
    } catch (e) {
      console.warn('Supabase auth listener initialization error:', e);
    }
  }, []);

  // 3. Theme State
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  // 4. Courses Master Data
  const [courses] = useState(masterCourses);

  // 5. Practice & Exam History State
  const [practiceHistory, setPracticeHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRACTICE_HISTORY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [examHistory, setExamHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAM_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 6. Recent Activity
  const [recentActivity, setRecentActivity] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY;
    } catch {
      return INITIAL_ACTIVITY;
    }
  });

  // 7. Bookmarks State
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 8. Settings State
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // 9. Global UI States
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');

  // Sync to LocalStorage & DOM
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      if (theme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    } catch (e) {
      console.warn('Theme update error:', e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRACTICE_HISTORY, JSON.stringify(practiceHistory));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [practiceHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXAM_HISTORY, JSON.stringify(examHistory));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [examHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(recentActivity));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [recentActivity]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [settings]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toggle Bookmark
  const toggleBookmark = (questionId) => {
    setBookmarks((prev) => {
      const exists = prev.includes(questionId);
      if (exists) {
        addToast('info', 'BOOKMARK REMOVED', `Question removed from your saved list.`);
        return prev.filter((id) => id !== questionId);
      } else {
        addToast('success', 'QUESTION BOOKMARKED', `Saved to your review repository.`);
        return [...prev, questionId];
      }
    });
  };

  // Save Phase Practice / Exam Result
  const savePhaseResult = (courseId, phaseId, result) => {
    const key = `${courseId}_${phaseId}`;
    setPracticeHistory((prev) => ({
      ...prev,
      [key]: {
        ...result,
        timestamp: Date.now(),
      },
    }));

    if (result.isExam) {
      setExamHistory((prev) => [
        {
          id: `exam-${Date.now()}`,
          courseId,
          phaseId,
          ...result,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    }

    // Add to activity journal
    const targetCourse = courses.find((c) => c.id === courseId);
    const newActivity = {
      id: `act-${Date.now()}`,
      courseId,
      courseTitle: targetCourse?.title || courseId,
      phaseTitle: result.phaseTitle || phaseId,
      score: result.correct,
      total: result.total,
      accuracy: result.accuracy,
      type: result.isExam ? 'EXAM' : 'PRACTICE',
      timestamp: Date.now(),
    };

    setRecentActivity((prev) => [newActivity, ...prev.slice(0, 15)]);
  };

  const value = {
    user,
    setUser,
    theme,
    setTheme,
    toggleTheme,
    courses,
    practiceHistory,
    examHistory,
    recentActivity,
    bookmarks,
    toggleBookmark,
    settings,
    setSettings,
    isCommandOpen,
    setIsCommandOpen,
    isSearchOpen,
    setIsSearchOpen,
    isRoleModalOpen,
    setIsRoleModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isMenuOpen,
    setIsMenuOpen,
    isFocusMode,
    setIsFocusMode,
    cursorLabel,
    setCursorLabel,
    toasts,
    addToast,
    removeToast,
    savePhaseResult,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
