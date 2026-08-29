import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { PROCTOR_VIOLATION_LIMIT } from '../../utils/constants';

export function ProctorWarningOverlay({
  isOpen,
  violationReason,
  violationCount,
  onAcknowledge,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-surface border border-[#D64545] rounded-lg shadow-2xl p-6 sm:p-8 z-10 text-main space-y-6 text-center"
        >
          <div className="w-12 h-12 rounded bg-[#D64545]/15 border border-[#D64545]/40 text-[#D64545] flex items-center justify-center mx-auto shadow-xs">
            <ShieldAlert size={24} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase block font-medium">
              SECURITY INFRACTION // STRIKE {violationCount} OF {PROCTOR_VIOLATION_LIMIT}
            </span>
            <h3 className="text-2xl font-display font-medium text-main uppercase">
              EXAM FOCUS LOST
            </h3>
            <p className="text-xs font-body text-secondary max-w-sm mx-auto leading-relaxed">
              {violationReason || 'Window focus was lost or an unauthorized tab switch was triggered.'}
            </p>
          </div>

          <div className="p-4 rounded bg-surface-raised border border-app text-xs font-mono text-secondary leading-relaxed text-left space-y-1">
            <strong className="text-[#D64545] block font-medium text-[10px] tracking-mono-label uppercase">
              SECURITY PROTOCOL WARNING:
            </strong>
            <p className="text-[11px]">
              Candidates must stay on the active examination window. Accumulating {PROCTOR_VIOLATION_LIMIT} infractions triggers immediate disqualification and zero grade reporting.
            </p>
          </div>

          <button
            onClick={onAcknowledge}
            className="w-full py-3.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium transition-all shadow-md cursor-pointer"
            type="button"
          >
            ACKNOWLEDGE & RETURN TO EXAM
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
