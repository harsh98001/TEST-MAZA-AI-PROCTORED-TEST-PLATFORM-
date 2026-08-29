import { motion } from 'framer-motion';

export function RouteLoadingFallback() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-main font-mono select-none">
      <div className="flex flex-col items-center space-y-4 text-center">
        {/* Sleek Minimalist Spinner */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border border-app" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-t-2 border-[#D64545]"
          />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] tracking-mono-label text-[#D64545] uppercase block font-medium animate-pulse">
            LOADING TELEMETRY
          </span>
          <span className="text-xs text-muted font-mono uppercase">
            FETCHING MODULE ASSETS...
          </span>
        </div>
      </div>
    </div>
  );
}
