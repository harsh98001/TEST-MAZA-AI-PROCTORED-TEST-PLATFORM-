import { motion } from 'framer-motion';
import { Terminal, Shield, Sparkles } from 'lucide-react';

export function ArenaPortalTransition({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-main font-mono overflow-hidden"
    >
      {/* 3D Wireframe Grid Tunnel Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] animate-pulse" />

      {/* Expanding Warp Rings */}
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        <motion.div
          initial={{ scale: 0.5, rotate: 0 }}
          animate={{ scale: [0.5, 1.2, 1], rotate: 180 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-2xl border-2 border-[#D64545] bg-[#D64545]/10 flex items-center justify-center text-[#D64545] shadow-[0_0_50px_rgba(214,69,69,0.3)]"
        >
          <Terminal size={36} />
        </motion.div>

        <div className="space-y-2">
          <span className="text-[10px] tracking-[0.3em] text-[#D64545] uppercase block font-medium animate-pulse">
            INITIALIZING CODE EXECUTION SANDBOX
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-main uppercase">
            ENTERING THE ARENA
          </h2>
          <p className="text-xs text-secondary max-w-sm mx-auto">
            Switching from examination review to high-performance LeetCode-style algorithmic IDE workspace.
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-48 h-1 bg-surface-raised rounded-full overflow-hidden border border-app">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            onAnimationComplete={onComplete}
            className="h-full bg-[#D64545]"
          />
        </div>
      </div>
    </motion.div>
  );
}
