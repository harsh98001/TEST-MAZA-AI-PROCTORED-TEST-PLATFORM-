import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export function QuestionOption({
  option,
  isSelected,
  isCorrect,
  selectedAnswer,
  onSelect,
  disabled,
}) {
  const showCorrect = selectedAnswer && isCorrect;
  const showWrong = isSelected && !isCorrect;

  return (
    <button
      onClick={() => !disabled && onSelect(option.label)}
      disabled={disabled}
      type="button"
      className={`w-full p-5 rounded-lg border text-left flex items-center justify-between transition-all duration-150 group cursor-pointer ${
        showCorrect
          ? 'border-[#10B981] bg-[#10B981]/10 text-main'
          : showWrong
          ? 'border-[#D64545] bg-[#D64545]/10 text-main'
          : isSelected
          ? 'border-[#D64545] bg-surface-raised text-main'
          : 'border-app bg-surface hover:border-[#D64545]/50 hover:bg-surface-raised text-secondary hover:text-main'
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* Monospace Letter Badge */}
        <span
          className={`w-8 h-8 rounded flex items-center justify-center font-mono text-xs font-medium shrink-0 transition-colors ${
            showCorrect
              ? 'bg-[#10B981] text-white'
              : showWrong
              ? 'bg-[#D64545] text-white'
              : 'border border-app bg-surface-raised text-main group-hover:border-[#D64545]'
          }`}
        >
          {option.label}
        </span>

        {/* Option Text */}
        <span className="text-sm font-body leading-relaxed">
          {option.text}
        </span>
      </div>

      {/* Result Indicator Icon */}
      {showCorrect && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 ml-3"
        >
          <Check size={14} strokeWidth={2.5} />
        </motion.div>
      )}
      {showWrong && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-6 h-6 rounded-full bg-[#D64545] text-white flex items-center justify-center shrink-0 ml-3"
        >
          <X size={14} strokeWidth={2.5} />
        </motion.div>
      )}
    </button>
  );
}
