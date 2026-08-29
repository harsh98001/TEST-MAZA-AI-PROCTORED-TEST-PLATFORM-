import { motion } from 'framer-motion';

export function ScoreRing({ accuracy = 0, size = 160 }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-app opacity-25"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={accuracy >= 75 ? '#10B981' : accuracy >= 50 ? '#F59E0B' : '#F43F5E'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Center Accuracy Number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl md:text-4xl font-display font-bold text-main">
          {accuracy}%
        </span>
        <span className="text-[10px] font-mono tracking-widest text-muted uppercase font-bold">
          ACCURACY
        </span>
      </div>
    </div>
  );
}
