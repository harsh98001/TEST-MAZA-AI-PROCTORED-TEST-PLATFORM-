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
  Terminal,
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
import { AuthScene3D } from '../three/AuthScene3D';

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
        setSuccessMessage(`Verification link dispatched to ${email}. Click the link in your inbox to enter Test Maza!`);
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
      setSuccessMessage(`Passwordless login link dispatched to ${email}! Click the link in your inbox to sign in instantly.`);
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
      setSuccessMessage(`Password reset link dispatched to ${email}! Check your inbox.`);
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
      {/* 3D Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-all"
      />

      {/* Main 3D Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-[#0C0C0C]/95 border border-[#D64545]/40 rounded-2xl shadow-[0_0_60px_-15px_rgba(214,69,69,0.4)] overflow-hidden z-10 text-main font-mono"
      >
        {/* Subtle Cyberpunk Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D64545]/5 to-transparent pointer-events-none opacity-40 animate-pulse" />

        {/* 1. TOP 3D THREE.JS SPATIAL HEADER */}
        <div className="relative h-44 border-b border-app bg-gradient-to-b from-black/90 via-[#141414]/90 to-[#0C0C0C] overflow-hidden flex flex-col justify-between p-4">
          {/* Live Interactive Three.js 3D Canvas */}
          <div className="absolute inset-0 z-0">
            <AuthScene3D className="w-full h-full" />
          </div>

          {/* Top HUD Row */}
          <div className="relative z-10 flex justify-between items-center text-[10px] text-muted uppercase tracking-mono-label">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#D64545] animate-pulse" />
              <span className="text-[#D64545] font-medium">[ 3D BIO-AUTH CORE ACTIVE ]</span>
            </div>
            <button
              onClick={onClose}
              className="text-muted hover:text-white p-1.5 rounded-lg bg-black/50 border border-white/10 hover:border-[#D64545] transition-all cursor-pointer"
              type="button"
            >
              <X size={15} />
            </button>
          </div>

          {/* Bottom Title Telemetry */}
          <div className="relative z-10 space-y-1">
            <span className="text-[9px] text-[#A0A09C] uppercase tracking-mono-label block">
              // ENCRYPTION: SHA-256 • PKCE AUTH PROTOCOL
            </span>
            <h2 className="text-xl font-display font-bold uppercase text-white tracking-tight drop-shadow-md">
              {mode === 'signin' && 'CANDIDATE SIGN IN'}
              {mode === 'signup' && 'REGISTER CANDIDATE ACCOUNT'}
              {mode === 'magiclink' && 'PASSWORDLESS MAGIC LINK'}
              {mode === 'forgot' && 'CREDENTIAL RECOVERY'}
              {mode === 'sent_confirmation' && 'VERIFICATION DISPATCHED'}
            </h2>
          </div>
        </div>

        {/* 2. AUTH MODE TABS */}
        {mode !== 'sent_confirmation' && (
          <div className="grid grid-cols-2 border-b border-app text-xs uppercase text-center font-mono bg-black/40">
            <button
              onClick={() => {
                setMode('signin');
                setErrorMessage('');
              }}
              className={`py-3.5 transition-all border-b-2 cursor-pointer flex items-center justify-center space-x-2 ${
                mode === 'signin' || mode === 'magiclink' || mode === 'forgot'
                  ? 'border-[#D64545] text-white font-bold bg-[#D64545]/10'
                  : 'border-transparent text-muted hover:text-secondary'
              }`}
              type="button"
            >
              <Key size={13} className={mode === 'signin' ? 'text-[#D64545]' : 'text-muted'} />
              <span>SIGN IN</span>
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setErrorMessage('');
              }}
              className={`py-3.5 transition-all border-b-2 cursor-pointer flex items-center justify-center space-x-2 ${
                mode === 'signup'
                  ? 'border-[#D64545] text-white font-bold bg-[#D64545]/10'
                  : 'border-transparent text-muted hover:text-secondary'
              }`}
              type="button"
            >
              <Sparkles size={13} className={mode === 'signup' ? 'text-[#D64545]' : 'text-muted'} />
              <span>CREATE ACCOUNT</span>
            </button>
          </div>
        )}

        {/* 3. FORM BODY CONTENT */}
        <div className="p-6 space-y-5 text-xs">
          {/* Error Banner */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-lg bg-[#D64545]/15 border border-[#D64545]/50 text-[#FF6B6B] flex items-start space-x-2.5 shadow-sm"
            >
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span className="leading-relaxed font-sans text-xs">{errorMessage}</span>
            </motion.div>
          )}

          {/* MODE: SIGN IN */}
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
                    className="w-full bg-[#161616] border border-app rounded-lg pl-10 pr-3.5 py-3 text-xs text-white placeholder:text-muted/50 focus:border-[#D64545] focus:ring-1 focus:ring-[#D64545]/50 outline-none transition-all"
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
                    className="w-full bg-[#161616] border border-app rounded-lg pl-10 pr-3.5 py-3 text-xs text-white placeholder:text-muted/50 focus:border-[#D64545] focus:ring-1 focus:ring-[#D64545]/50 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-lg bg-[#D64545] hover:bg-[#E05656] disabled:opacity-50 text-white text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-[0_4px_20px_rgba(214,69,69,0.4)] cursor-pointer"
              >
                {loading ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <>
                    <span>AUTHENTICATE SESSION</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <div className="pt-3 text-center border-t border-app">
                <button
                  type="button"
                  onClick={() => {
                    setMode('magiclink');
                    setErrorMessage('');
                  }}
                  className="text-[11px] text-muted hover:text-[#D64545] transition-colors cursor-pointer"
                >
                  ⚡ Or Sign In via <strong>Passwordless Magic Link</strong>
                </button>
              </div>
            </form>
          )}

          {/* MODE: SIGN UP (Confirmation Link) */}
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
                    className="w-full bg-[#161616] border border-app rounded-lg pl-10 pr-3.5 py-3 text-xs text-white placeholder:text-muted/50 focus:border-[#D64545] focus:ring-1 focus:ring-[#D64545]/50 outline-none transition-all"
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
                    className="w-full bg-[#161616] border border-app rounded-lg pl-10 pr-3.5 py-3 text-xs text-white placeholder:text-muted/50 focus:border-[#D64545] focus:ring-1 focus:ring-[#D64545]/50 outline-none transition-all"
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
                    className="w-full bg-[#161616] border border-app rounded-lg pl-10 pr-3.5 py-3 text-xs text-white placeholder:text-muted/50 focus:border-[#D64545] focus:ring-1 focus:ring-[#D64545]/50 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-lg bg-[#D64545] hover:bg-[#E05656] disabled:opacity-50 text-white text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-[0_4px_20px_rgba(214,69,69,0.4)] cursor-pointer"
              >
                {loading ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <>
                    <span>REGISTER CANDIDATE ACCOUNT</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>

              <p className="text-[10px] text-muted text-center leading-relaxed font-sans">
                A verification link will be delivered directly to your email inbox to activate your account.
              </p>
            </form>
          )}

          {/* MODE: MAGIC LINK */}
          {mode === 'magiclink' && (
            <form onSubmit={handleSendMagicLink} className="space-y-4">
              <p className="text-secondary leading-relaxed font-sans text-xs">
                Enter your email address. We will dispatch an instant passwordless login link directly to your inbox.
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
                    className="w-full bg-[#161616] border border-app rounded-lg pl-10 pr-3.5 py-3 text-xs text-white placeholder:text-muted/50 focus:border-[#D64545] focus:ring-1 focus:ring-[#D64545]/50 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-lg bg-[#D64545] hover:bg-[#E05656] disabled:opacity-50 text-white text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-[0_4px_20px_rgba(214,69,69,0.4)] cursor-pointer"
              >
                {loading ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <>
                    <Send size={14} />
                    <span>DISPATCH MAGIC LINK</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center border-t border-app">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-[11px] text-muted hover:text-white transition-colors cursor-pointer"
                >
                  ← Back to Email & Password Sign In
                </button>
              </div>
            </form>
          )}

          {/* MODE: FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-secondary leading-relaxed font-sans text-xs">
                Enter your registered account email to receive a secure password recovery link.
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
                    className="w-full bg-[#161616] border border-app rounded-lg pl-10 pr-3.5 py-3 text-xs text-white placeholder:text-muted/50 focus:border-[#D64545] focus:ring-1 focus:ring-[#D64545]/50 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-lg bg-[#D64545] hover:bg-[#E05656] disabled:opacity-50 text-white text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-[0_4px_20px_rgba(214,69,69,0.4)] cursor-pointer"
              >
                {loading ? (
                  <RefreshCw size={15} className="animate-spin" />
                ) : (
                  <>
                    <Send size={14} />
                    <span>DISPATCH RECOVERY LINK</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center border-t border-app">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-[11px] text-muted hover:text-white transition-colors cursor-pointer"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* MODE: CONFIRMATION SENT */}
          {mode === 'sent_confirmation' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#10B981]/15 border border-[#10B981]/50 flex items-center justify-center text-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <Mail size={26} className="animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white uppercase font-display">
                  CONFIRMATION EMAIL DISPATCHED!
                </h3>
                <p className="text-secondary text-xs leading-relaxed max-w-sm mx-auto font-sans">
                  {successMessage}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#161616] border border-app text-[11px] text-[#A0A09C] font-sans">
                Open your email client and click the verification link to be authenticated into Test Maza automatically.
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-lg bg-[#161616] border border-app hover:border-[#D64545] text-white text-xs uppercase tracking-mono-label transition-colors cursor-pointer"
                type="button"
              >
                CLOSE WINDOW
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
