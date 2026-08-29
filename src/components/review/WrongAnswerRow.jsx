import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function WrongAnswerRow({ question, userAnswer }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const correctOption = question.options?.find((opt) => opt.label === question.answer);
  const userOption = question.options?.find((opt) => opt.label === userAnswer);

  return (
    <div className="p-4 sm:p-5 rounded-xl border border-[#f43f5e]/30 bg-[#f43f5e]/05 space-y-3 transition-colors shadow-xs">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#f43f5e]">
            <span>Q{question.id}</span>
            <span className="text-muted font-normal">// {question.unit}</span>
          </div>
          <h4 className="text-sm md:text-base font-bold text-main">
            {question.question}
          </h4>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg text-secondary hover:text-main border border-app bg-surface shrink-0 cursor-pointer shadow-xs"
          type="button"
          aria-label="Toggle Solution"
        >
          {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      {/* Comparison row (Wayground style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
        <div className="p-3 rounded-lg bg-[#f43f5e]/10 border border-[#f43f5e]/25 text-[#f43f5e]">
          <span className="text-[10px] text-[#f43f5e]/80 block mb-0.5 font-bold">YOUR ANSWER:</span>
          <strong>{userAnswer || 'NO SELECTION'}</strong> {userOption ? `— ${userOption.text}` : ''}
        </div>
        <div className="p-3 rounded-lg bg-[#10B981]/10 border border-[#10B981]/25 text-[#10B981]">
          <span className="text-[10px] text-[#10B981]/80 block mb-0.5 font-bold">CORRECT ANSWER:</span>
          <strong>{question.answer}</strong> — {correctOption?.text}
        </div>
      </div>

      {/* Expanded Solution */}
      {isExpanded && question.solution && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pt-2 text-xs text-main bg-surface p-4 rounded-lg border border-app leading-relaxed font-sans shadow-xs"
        >
          <span className="font-mono text-[#10B981] font-bold block mb-1 text-[11px] uppercase">
            SOLUTION & RATIONALE:
          </span>
          {question.solution}
        </motion.div>
      )}
    </div>
  );
}
