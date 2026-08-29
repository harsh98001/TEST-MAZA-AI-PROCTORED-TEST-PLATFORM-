import { motion } from 'framer-motion';
import { ShieldX } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ExamLockoutScreen({ violations = [], onRestart }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-8 rounded-lg border border-[#D64545]/50 bg-surface text-center space-y-6 shadow-2xl"
      >
        <div className="w-14 h-14 rounded bg-[#D64545]/15 border border-[#D64545]/40 text-[#D64545] flex items-center justify-center mx-auto shadow-xs">
          <ShieldX size={28} />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase block font-medium">
            EXAM DISQUALIFICATION // 03 STRIKES
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-main uppercase">
            TEST TERMINATED
          </h3>
          <p className="text-xs text-secondary font-body leading-relaxed">
            The examination session was terminated because high-stakes proctoring security rules were repeatedly breached (3/3 security infractions recorded).
          </p>
        </div>

        {/* Violations List */}
        <div className="p-4 rounded bg-surface-raised border border-app text-left space-y-2">
          <span className="text-[10px] font-mono font-medium text-[#D64545] uppercase block tracking-mono-label">
            RECORDED INFRACTIONS:
          </span>
          <div className="space-y-1.5 text-xs font-mono text-secondary">
            {violations.map((v, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="text-[#D64545] font-medium">0{i + 1}.</span>
                <span>{v.reason}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={onRestart}
            className="w-full py-3.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium transition-all shadow-md cursor-pointer"
            type="button"
          >
            START RE-EVALUATION SESSION
          </button>
          <Link
            to="/courses"
            className="block text-xs font-mono text-muted hover:text-main transition-colors uppercase"
          >
            RETURN TO ACADEMIC CATALOG →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
