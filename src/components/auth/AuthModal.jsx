import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Key,
  Lock,
  Mail,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import {
  supabase,
  signUpWithPassword,
  signInWithPassword,
  sendMagicLink,
  resetPasswordForEmail,
} from '../../lib/supabaseClient';
import { useApp } from '../../context/AppContext';

export function AuthModal({ isOpen, onClose }) {
  const { setUser, addToast } = useApp();

  // Mode: 'signin' | 'signup' | 'magiclink' | 'forgot' | 'sent_confirmation'
  const [mode, setMode] = useState('signin');

  // Form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      setSuccessMessage('');
      setMode('signin');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 1. Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const result = await signInWithPassword(email, password);
      const userObj = result.user;
      const verifiedName =
        userObj?.user_metadata?.full_name || email.split('@')[0] || 'Candidate';

      setUser((prev) => ({
        ...prev,
        name: verifiedName,
        email: userObj?.email || email,
        isAuthenticated: true,
      }));

      addToast('success', 'AUTHENTICATED', `Welcome back, ${verifiedName}!`);
      onClose();
    } catch (err) {
      console.error('Sign in error:', err);
      if (err.message?.toLowerCase().includes('email not confirmed')) {
        setErrorMessage('Your email is not confirmed yet. Check your inbox for the confirmation link.');
      } else if (err.message?.toLowerCase().includes('invalid login credentials')) {
        setErrorMessage('Invalid email or password. Please check your credentials.');
      } else {
        setErrorMessage(err.message || 'Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Sign Up (Email Confirmation)
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide your email and create a password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const result = await signUpWithPassword(email, password, fullName);

      // If user is automatically logged in or needs confirmation
      if (result.session) {
        const verifiedName = fullName.trim() || email.split('@')[0] || 'Candidate';
        setUser((prev) => ({
          ...prev,
          name: verifiedName,
          email,
          isAuthenticated: true,
        }));
        addToast('success', 'ACCOUNT CREATED', `Welcome to Test Maza, ${verifiedName}!`);
        onClose();
      } else {
        setSuccessMessage(`We sent a verification link to ${email}. Click the link in your email to complete registration!`);
        setMode('sent_confirmation');
      }
    } catch (err) {
      console.error('Sign up error:', err);
      if (err.message?.toLowerCase().includes('already registered')) {
        setErrorMessage('An account with this email already exists. Please sign in.');
      } else {
        setErrorMessage(err.message || 'Failed to create account.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Magic Link
  const handleSendMagicLink = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await sendMagicLink(email);
      setSuccessMessage(`Magic login link sent to ${email}! Click the link in your inbox to sign in instantly.`);
      setMode('sent_confirmation');
    } catch (err) {
      console.error('Magic link error:', err);
      setErrorMessage(err.message || 'Failed to send magic link.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Password Reset
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter your account email address.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await resetPasswordForEmail(email);
      setSuccessMessage(`Password reset link sent to ${email}! Check your inbox.`);
      setMode('sent_confirmation');
    } catch (err) {
      console.error('Reset error:', err);
      setErrorMessage(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md bg-surface border border-app rounded-xl shadow-2xl overflow-hidden z-10 text-main font-mono"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-app bg-surface-raised/40 flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-[#D64545]/10 border border-[#D64545]/30 flex items-center justify-center text-[#D64545]">
              <ShieldCheck size={16} />
            </div>
            <div>
              <span className="text-[10px] text-muted tracking-mono-label uppercase block font-medium">
                CANDIDATE GATEWAY
              </span>
              <h2 className="text-sm font-display font-bold uppercase text-main tracking-tight">
                {mode === 'signin' && 'SIGN IN TO TEST MAZA'}
                {mode === 'signup' && 'CREATE CANDIDATE ACCOUNT'}
                {mode === 'magiclink' && 'PASSWORDLESS MAGIC LINK'}
                {mode === 'forgot' && 'RESET YOUR PASSWORD'}
                {mode === 'sent_confirmation' && 'CHECK YOUR INBOX'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-muted hover:text-main p-1.5 rounded-lg hover:bg-surface-raised transition-colors cursor-pointer"
            type="button"
          >
            <X size={16} />
          </button>
        </div>

        {/* Auth Mode Tabs */}
        {mode !== 'sent_confirmation' && (
          <div className="grid grid-cols-2 border-b border-app text-xs uppercase text-center font-mono">
            <button
              onClick={() => {
                setMode('signin');
                setErrorMessage('');
              }}
              className={`py-3 transition-colors border-b-2 cursor-pointer ${
                mode === 'signin' || mode === 'magiclink' || mode === 'forgot'
                  ? 'border-[#D64545] text-main font-bold bg-surface-raised/30'
                  : 'border-transparent text-muted hover:text-secondary'
              }`}
              type="button"
            >
              SIGN IN
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setErrorMessage('');
              }}
              className={`py-3 transition-colors border-b-2 cursor-pointer ${
                mode === 'signup'
                  ? 'border-[#D64545] text-main font-bold bg-surface-raised/30'
                  : 'border-transparent text-muted hover:text-secondary'
              }`}
              type="button"
            >
              CREATE ACCOUNT
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-[#D64545]/10 border border-[#D64545]/40 text-[#D64545] flex items-start space-x-2.5">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* 1. SIGN IN FORM */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-muted uppercase tracking-mono-label block">
                  CANDIDATE EMAIL
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-3.5 text-muted" />
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-raised border border-app rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-main placeholder:text-muted/60 focus:border-[#D64545] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-muted uppercase tracking-mono-label">
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setErrorMessage('');
                    }}
                    className="text-[10px] text-[#D64545] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-3.5 text-muted" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-raised border border-app rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-main placeholder:text-muted/60 focus:border-[#D64545] outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-[#D64545] hover:bg-[#E05656] disabled:opacity-50 text-white text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
              >
                {loading ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <>
                    <span>SIGN IN</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <div className="pt-2 text-center border-t border-app">
                <button
                  type="button"
                  onClick={() => {
                    setMode('magiclink');
                    setErrorMessage('');
                  }}
                  className="text-[11px] text-muted hover:text-main transition-colors cursor-pointer"
                >
                  ⚡ Or Sign In via <strong>Passwordless Magic Link</strong>
                </button>
              </div>
            </form>
          )}

          {/* 2. SIGN UP FORM (Confirmation Link) */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-muted uppercase tracking-mono-label block">
                  FULL NAME
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-3.5 text-muted" />
                  <input
                    type="text"
                    placeholder="Candidate Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-surface-raised border border-app rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-main placeholder:text-muted/60 focus:border-[#D64545] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-muted uppercase tracking-mono-label block">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-3.5 text-muted" />
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-raised border border-app rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-main placeholder:text-muted/60 focus:border-[#D64545] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-muted uppercase tracking-mono-label block">
                  CREATE PASSWORD (MIN 6 CHARS)
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-3.5 text-muted" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-raised border border-app rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-main placeholder:text-muted/60 focus:border-[#D64545] outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-[#D64545] hover:bg-[#E05656] disabled:opacity-50 text-white text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
              >
                {loading ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <>
                    <span>REGISTER ACCOUNT</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <p className="text-[10px] text-muted text-center leading-relaxed">
                A verification link will be delivered directly to your email inbox to activate your account.
              </p>
            </form>
          )}

          {/* 3. MAGIC LINK FORM */}
          {mode === 'magiclink' && (
            <form onSubmit={handleSendMagicLink} className="space-y-4">
              <p className="text-secondary leading-relaxed">
                Enter your email. We will send you an instant login link — no password required.
              </p>

              <div className="space-y-1.5">
                <label className="text-[10px] text-muted uppercase tracking-mono-label block">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-3.5 text-muted" />
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-raised border border-app rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-main placeholder:text-muted/60 focus:border-[#D64545] outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-[#D64545] hover:bg-[#E05656] disabled:opacity-50 text-white text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
              >
                {loading ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <>
                    <Send size={14} />
                    <span>SEND MAGIC LINK</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center border-t border-app">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-[11px] text-muted hover:text-main transition-colors cursor-pointer"
                >
                  ← Back to Email & Password Sign In
                </button>
              </div>
            </form>
          )}

          {/* 4. FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-secondary leading-relaxed">
                Enter your email address to receive a secure password reset link.
              </p>

              <div className="space-y-1.5">
                <label className="text-[10px] text-muted uppercase tracking-mono-label block">
                  ACCOUNT EMAIL
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-3.5 text-muted" />
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-raised border border-app rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-main placeholder:text-muted/60 focus:border-[#D64545] outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-[#D64545] hover:bg-[#E05656] disabled:opacity-50 text-white text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
              >
                {loading ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <>
                    <Send size={14} />
                    <span>SEND RESET LINK</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center border-t border-app">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-[11px] text-muted hover:text-main transition-colors cursor-pointer"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* 5. CONFIRMATION EMAIL SENT SCREEN */}
          {mode === 'sent_confirmation' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
                <Mail size={24} className="animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-main uppercase">
                  CONFIRMATION EMAIL SENT!
                </h3>
                <p className="text-secondary text-xs leading-relaxed max-w-sm mx-auto">
                  {successMessage}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-surface-raised border border-app text-[11px] text-muted">
                Click the confirmation link inside your email to be logged in automatically.
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-lg bg-surface-raised border border-app hover:border-[#D64545] text-main text-xs uppercase tracking-mono-label transition-colors cursor-pointer"
                type="button"
              >
                CLOSE
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
