import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user already saw preloader in this session
    const hasSeen = sessionStorage.getItem('testmaza_preloader_seen');
    if (hasSeen) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          sessionStorage.setItem('testmaza_preloader_seen', 'true');
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 150);
          return 100;
        }
        const diff = Math.floor(Math.random() * 25) + 15;
        return Math.min(100, prev + diff);
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#0A0A0A] text-[#F5F4F0] flex flex-col justify-between p-8 md:p-14 select-none pointer-events-none"
        >
          {/* Top Label */}
          <div className="flex justify-between items-center text-[10px] font-mono text-[#8E8E8C] tracking-mono-label uppercase">
            <span>TEST MAZA // SYSTEM BOOT</span>
            <span>R3F 3D & ARENA ACTIVE</span>
          </div>

          {/* Center Progress Counter */}
          <div className="max-w-4xl mx-auto w-full space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-5xl sm:text-7xl md:text-8xl font-display font-medium tracking-tight">
                {progress < 10 ? `0${progress}` : progress}
                <span className="text-xl sm:text-2xl font-mono text-[#D64545] ml-2">%</span>
              </span>
              <span className="text-xs font-mono text-[#8E8E8C] tracking-mono-label hidden sm:inline">
                INITIALIZING SPATIAL SCENE
              </span>
            </div>

            {/* Razor-thin Progress Line */}
            <div className="w-full h-[1px] bg-[#222222] overflow-hidden">
              <motion.div
                className="h-full bg-[#D64545]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </div>

          {/* Bottom Metas */}
          <div className="flex justify-between items-center text-[10px] font-mono text-[#555553] tracking-mono-label uppercase">
            <span>[ 1,196 CERTIFIED MCQS & CODING TASKS ]</span>
            <span>AI PROCTOR WATCHDOG ARMED</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
