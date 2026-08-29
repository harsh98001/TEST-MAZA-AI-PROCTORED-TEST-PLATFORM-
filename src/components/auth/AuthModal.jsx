import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Key,
  Lock,
  Mail,
  RefreshCw,
  Send,
  Settings,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import {
  supabase,
  isConfigured,
  getStoredSupabaseConfig,
  saveSupabaseConfig,
  sendEmailVerification,
  verifyEmailCode,
  signUpWithPassword,
  signInWithPassword,
} from '../../lib/supabaseClient';
import { useApp } from '../../context/AppContext';

export function AuthModal({ isOpen, onClose }) {
  const { setUser, addToast } = useApp();

  // Authentication Flow States: 'email_entry' | 'otp_verify' | 'password_entry' | 'supabase_config'
  const [step, setStep] = useState('email_entry');
  const [authMethod, setAuthMethod] = useState('otp'); // 'otp' | 'password' | 'signup'

  // Input states
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Supabase Config States
  const [customUrl, setCustomUrl] = useState('');
  const [customKey, setCustomKey] = useState('');

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpInputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      const config = getStoredSupabaseConfig();
      setCustomUrl(config.url || '');
      setCustomKey(config.anonKey || '');
      setErrorMessage('');
      setStep('email_entry');
    }
  }, [isOpen]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    if (step === 'otp_verify') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [step]);

  if (!isOpen) return null;

  const isConnected = isConfigured();

  // 1. Send Email Verification / OTP Code
  const handleSendEmailVerification = async (e) => {
    if (e) e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!isConnected) {
      setStep('supabase_config');
      setErrorMessage('Configure your Supabase Project URL and Anon API Key to send real verification emails.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      if (authMethod === 'signup' && password) {
        await signUpWithPassword(email, password, fullName);
      } else {
        await sendEmailVerification(email);
      }

      setStep('otp_verify');
      setResendCooldown(60);
      addToast(
        'info',
        'VERIFICATION SENT',
        `We sent a 6-digit confirmation code to ${email}. Check your inbox!`
      );
    } catch (err) {
      console.error('Email send error:', err);
      setErrorMessage(err.message || 'Failed to dispatch verification email. Verify project keys.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle OTP Input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...otpCode];
    newCode[index] = value.slice(-1);
    setOtpCode(newCode);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    const fullCode = newCode.join('');
    if (fullCode.length === 6) {
      handleVerifyCode(fullCode);
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim().replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const chars = pasted.split('');
      setOtpCode(chars);
      handleVerifyCode(pasted);
    }
  };

  // 3. Verify OTP Code
  const handleVerifyCode = async (codeToVerify) => {
    const code = codeToVerify || otpCode.join('');
    if (code.length < 6) {
      setErrorMessage('Please enter the full 6-digit verification code.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const result = await verifyEmailCode(email, code);
      const userObj = result.data?.user;
      const verifiedName =
        fullName.trim() ||
        userObj?.user_metadata?.full_name ||
        email.split('@')[0] ||
        'Candidate';

      setUser((prev) => ({
        ...prev,
        name: verifiedName,
        email: userObj?.email || email,
        isAuthenticated: true,
      }));

      addToast('success', 'EMAIL CONFIRMED', `Welcome to Test Maza, ${verifiedName}!`);
      onClose();
    } catch (err) {
      console.error('Verification error:', err);
      setErrorMessage(err.message || 'Invalid or expired verification code.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Password Login Handler
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!isConnected) {
      setStep('supabase_config');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const result = await signInWithPassword(email, password);
      const userObj = result.data?.user;
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
      console.error('Password login error:', err);
      if (err.message?.toLowerCase().includes('email not confirmed')) {
        setStep('otp_verify');
        setErrorMessage('Your email is not verified yet. We sent a verification code to your email.');
        sendEmailVerification(email).catch(() => {});
      } else {
        setErrorMessage(err.message || 'Invalid login credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 5. Save Supabase Configuration
  const handleSaveSupabaseConfig = (e) => {
    e.preventDefault();
    if (!customUrl || !customKey) {
      setErrorMessage('Please enter both Supabase Project URL and Anon API Key.');
      return;
    }

    if (!customUrl.startsWith('http')) {
      setErrorMessage('Supabase URL must start with https://');
      return;
    }

    saveSupabaseConfig(customUrl, customKey);
    addToast('success', 'SUPABASE CONNECTED', 'Project credentials saved.');
    setStep('email_entry');
    setErrorMessage('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-surface border border-app rounded-lg p-8 z-10 text-main space-y-6 shadow-2xl"
        >
          {/* Top Header */}
          <div className="flex justify-between items-start hairline-b pb-4">
            <div>
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase mb-1">
                <ShieldCheck size={13} />
                <span>SECURE CANDIDATE GATEWAY</span>
              </div>
              <h3 className="text-2xl font-display font-medium text-main uppercase">
                {step === 'otp_verify'
                  ? 'Verify Email Address'
                  : step === 'supabase_config'
                  ? 'Supabase Connection'
                  : authMethod === 'password'
                  ? 'Password Authentication'
                  : 'Candidate Identification'}
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setStep(step === 'supabase_config' ? 'email_entry' : 'supabase_config')}
                className="p-1.5 rounded border border-app bg-surface-raised text-secondary hover:text-main cursor-pointer"
                title="Configure Supabase API"
                type="button"
              >
                <Settings size={14} className={isConnected ? 'text-[#10B981]' : 'text-[#D64545]'} />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded border border-app bg-surface-raised text-secondary hover:text-main cursor-pointer"
                type="button"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3.5 rounded border border-[#D64545]/40 bg-[#D64545]/10 text-xs font-mono text-[#D64545] flex items-start space-x-2">
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: EMAIL ENTRY */}
          {step === 'email_entry' && (
            <div className="space-y-5 font-mono">
              {/* Method Switcher Tabs */}
              <div className="grid grid-cols-2 p-1 rounded border border-app bg-surface-raised text-xs">
                <button
                  onClick={() => setAuthMethod('otp')}
                  className={`py-2 rounded transition-all cursor-pointer ${
                    authMethod === 'otp'
                      ? 'bg-surface text-main font-medium shadow-xs'
                      : 'text-secondary hover:text-main'
                  }`}
                  type="button"
                >
                  EMAIL OTP / MAGIC LINK
                </button>
                <button
                  onClick={() => setAuthMethod('password')}
                  className={`py-2 rounded transition-all cursor-pointer ${
                    authMethod === 'password'
                      ? 'bg-surface text-main font-medium shadow-xs'
                      : 'text-secondary hover:text-main'
                  }`}
                  type="button"
                >
                  PASSWORD
                </button>
              </div>

              <form
                onSubmit={authMethod === 'password' ? handlePasswordLogin : handleSendEmailVerification}
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] text-muted tracking-mono-label uppercase block mb-1.5 font-medium">
                    CANDIDATE EMAIL ADDRESS *
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="candidate@university.edu"
                      className="w-full pl-10 pr-4 py-3 rounded border border-app bg-surface-raised text-xs font-mono text-main outline-none focus:border-[#D64545] transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-muted mt-1 block">
                    A real verification OTP & confirmation link will be delivered to this email.
                  </span>
                </div>

                {authMethod === 'password' && (
                  <div>
                    <label className="text-[10px] text-muted tracking-mono-label uppercase block mb-1.5 font-medium">
                      PASSWORD *
                    </label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 rounded border border-app bg-surface-raised text-xs font-mono text-main outline-none focus:border-[#D64545] transition-all"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-40"
                >
                  {loading ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>DISPATCHING VERIFICATION...</span>
                    </>
                  ) : authMethod === 'password' ? (
                    <>
                      <span>AUTHENTICATE</span>
                      <ArrowRight size={13} />
                    </>
                  ) : (
                    <>
                      <span>SEND VERIFICATION CODE</span>
                      <Send size={13} />
                    </>
                  )}
                </button>
              </form>

              {/* Status */}
              <div className="pt-4 hairline-t flex items-center justify-between text-[11px] text-muted">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-[#10B981]' : 'bg-[#D64545]'}`} />
                  <span>{isConnected ? 'Supabase Connected' : 'Supabase Setup Required'}</span>
                </div>
                <button
                  onClick={() => setStep('supabase_config')}
                  className="text-[#D64545] hover:underline uppercase"
                  type="button"
                >
                  {isConnected ? 'VIEW KEYS' : 'CONNECT PROJECT →'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: 6-DIGIT OTP VERIFICATION */}
          {step === 'otp_verify' && (
            <div className="space-y-6 text-center font-mono">
              <div className="space-y-2">
                <h4 className="text-xl font-display font-medium text-main uppercase">
                  CHECK YOUR INBOX
                </h4>
                <p className="text-xs text-secondary leading-relaxed font-body">
                  We sent a 6-digit confirmation code & instant verification link to:
                </p>
                <div className="text-xs text-[#D64545] bg-surface-raised px-3 py-1.5 rounded border border-app inline-block font-medium">
                  {email}
                </div>
              </div>

              {/* 6-Digit OTP Box Grid */}
              <div className="space-y-2">
                <label className="text-[10px] text-muted tracking-mono-label uppercase block">
                  ENTER 6-DIGIT VERIFICATION CODE
                </label>
                <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-13 text-center font-display text-2xl rounded border border-app bg-surface-raised text-main outline-none focus:border-[#D64545] focus:bg-surface transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Verify Action */}
              <button
                onClick={() => handleVerifyCode()}
                disabled={loading || otpCode.join('').length < 6}
                className="w-full py-3.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-40"
                type="button"
              >
                {loading ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>VERIFYING CODE...</span>
                  </>
                ) : (
                  <>
                    <span>VERIFY & ENTER</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>

              {/* Notice & Resend */}
              <div className="space-y-3 pt-2 text-xs text-muted">
                <p className="text-[11px] text-secondary font-body">
                  <em>You can also click the confirmation link in your email to authenticate automatically.</em>
                </p>

                <div className="flex justify-between items-center pt-3 hairline-t">
                  <button
                    onClick={() => setStep('email_entry')}
                    className="flex items-center space-x-1 text-secondary hover:text-main cursor-pointer"
                    type="button"
                  >
                    <ArrowLeft size={12} />
                    <span>CHANGE EMAIL</span>
                  </button>

                  <button
                    onClick={handleSendEmailVerification}
                    disabled={resendCooldown > 0 || loading}
                    className="text-[#D64545] hover:underline disabled:opacity-40 disabled:no-underline cursor-pointer"
                    type="button"
                  >
                    {resendCooldown > 0 ? `RESEND (${resendCooldown}s)` : 'RESEND CODE'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUPABASE CONFIG */}
          {step === 'supabase_config' && (
            <form onSubmit={handleSaveSupabaseConfig} className="space-y-4 font-mono">
              <div className="p-4 rounded border border-app bg-surface-raised space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-[#D64545] font-medium">
                  <Key size={14} />
                  <span className="tracking-mono-label uppercase">SUPABASE PROJECT API</span>
                </div>
                <p className="text-secondary leading-relaxed text-[11px] font-body">
                  To send real OTP codes to user inboxes, supply your project credentials from your{' '}
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D64545] underline"
                  >
                    Supabase Project Settings → API
                  </a>.
                </p>
              </div>

              <div>
                <label className="text-[10px] text-muted tracking-mono-label uppercase block mb-1">
                  SUPABASE PROJECT URL *
                </label>
                <input
                  type="text"
                  required
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full px-4 py-2.5 rounded border border-app bg-surface-raised text-xs text-main outline-none focus:border-[#D64545]"
                />
              </div>

              <div>
                <label className="text-[10px] text-muted tracking-mono-label uppercase block mb-1">
                  SUPABASE ANON PUBLIC API KEY *
                </label>
                <textarea
                  required
                  rows={3}
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-4 py-2.5 rounded border border-app bg-surface-raised text-xs text-main outline-none focus:border-[#D64545]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setStep('email_entry')}
                  className="py-3 px-4 rounded border border-app bg-surface-raised text-xs text-main cursor-pointer"
                  type="button"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded bg-[#D64545] hover:bg-[#E05656] text-white text-xs tracking-mono-label uppercase font-medium cursor-pointer"
                >
                  SAVE & CONNECT
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
