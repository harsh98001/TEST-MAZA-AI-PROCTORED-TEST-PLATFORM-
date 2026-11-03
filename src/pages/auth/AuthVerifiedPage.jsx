import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Sparkles, Terminal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export function AuthVerifiedPage() {
  const [countdown, setCountdown] = useState(3);
  const [isClosedAttempted, setIsClosedAttempted] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Capture session details if present
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setVerifiedEmail(session.user.email);
      }
    });

    // 2. 3-Second Precision Countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAutoClose = () => {
    setIsClosedAttempted(true);
    try {
      // Attempt native browser window close
      window.close();
      
      // If browser security blocks window.close() (standard for tabs not opened via window.open)
      // fallback to redirecting candidate directly into the app
      setTimeout(() => {
        if (!window.closed) {
          navigate('/');
        }
      }, 800);
    } catch {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#EDEDED] flex items-center justify-center p-4 relative overflow-hidden font-mono selection:bg-[#D64545] selection:text-white">
      {/* Background Cyberpunk Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D64545]/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Grid Scanline Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-md w-full rounded-2xl bg-[#0F0F0F]/90 backdrop-blur-2xl border border-white/10 p-8 text-center shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6"
      >
        {/* Animated Hologram Icon */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-[#10B981]/40"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-2 rounded-full bg-[#10B981]/15 blur-sm"
          />
          <div className="w-14 h-14 rounded-full bg-[#10B981]/20 border border-[#10B981]/50 text-[#10B981] flex items-center justify-center relative shadow-[0_0_25px_rgba(16,185,129,0.35)]">
            <CheckCircle2 size={30} className="stroke-[2.2]" />
          </div>
        </div>

        {/* Security Telemetry Badge */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-[10px] uppercase tracking-[0.2em] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
            <span>BIO-CORE AUTHENTICATION VERIFIED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight uppercase">
            SESSION CONFIRMED
          </h1>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            {verifiedEmail ? (
              <>Identity authorized for <strong className="text-neutral-200">{verifiedEmail}</strong>.</>
            ) : (
              <>Your candidate session credentials have been cryptographic-locked & validated.</>
            )}
          </p>
        </div>

        {/* Real-Time Countdown Meter */}
        <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-3">
          <div className="flex justify-between items-center text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Terminal size={12} className="text-[#10B981]" /> WINDOW AUTO-CLOSE
            </span>
            <span className="text-[#10B981] font-bold">
              {countdown > 0 ? `CLOSING IN 0${countdown}S` : 'TERMINATING...'}
            </span>
          </div>

          {/* Progress Bar Gauge */}
          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/10">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: `${(countdown / 3) * 100}%` }}
              transition={{ duration: 1, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-[#10B981] to-[#34D399]"
            />
          </div>

          <div className="text-[10px] text-neutral-500 font-sans">
            Secure token exchanged. You may return to your exam browser or proceed below.
          </div>
        </div>

        {/* Manual Actions */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={handleAutoClose}
            className="w-full py-3.5 px-4 rounded-xl bg-[#D64545] hover:bg-[#E05656] text-white font-medium text-xs tracking-[0.15em] uppercase transition-all shadow-[0_4px_20px_rgba(214,69,69,0.35)] flex items-center justify-center space-x-2 cursor-pointer group"
          >
            <span>LAUNCH TEST MAZA PORTAL</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => window.close()}
            className="text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-wider block mx-auto cursor-pointer"
          >
            [ CLOSE THIS TAB MANUALLY ]
          </button>
        </div>

        {/* Footer Audit Code */}
        <div className="text-[9px] text-neutral-600 border-t border-white/5 pt-4 uppercase tracking-widest">
          SHA-256 PKCE PROTOCOL &bull; ENCRYPTED TOKEN ANCHOR
        </div>
      </motion.div>
    </div>
  );
}

export default AuthVerifiedPage;
