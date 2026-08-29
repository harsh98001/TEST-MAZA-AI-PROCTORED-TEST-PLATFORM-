import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { QuestionOption } from './QuestionOption';
import { useApp } from '../../context/AppContext';

export function QuestionPanel({
  question,
  currentIndex,
  totalQuestions,
  answers,
  onChooseAnswer,
  onNext,
  onPrevious,
  onFinish,
}) {
  const { bookmarks, toggleBookmark } = useApp();
  const [showExplanation, setShowExplanation] = useState(false);

  if (!question) return null;

  const selectedAnswer = answers[question.id];
  const isBookmarked = bookmarks.includes(question.id);
  const isCorrect = selectedAnswer === question.answer;

  return (
    <div className="max-w-3xl w-full mx-auto p-8 md:p-10 rounded-lg border border-app bg-surface space-y-8">
      {/* Top Metadata Row */}
      <div className="flex justify-between items-center text-xs font-mono text-secondary hairline-b pb-4">
        <div className="flex items-center space-x-3">
          <span className="text-[#D64545] tracking-mono-label uppercase">
            [ QUESTION {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1} / {totalQuestions} ]
          </span>
          <span className="text-muted">// {question.unit}</span>
        </div>

        <button
          onClick={() => toggleBookmark(question.id)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded border transition-colors cursor-pointer ${
            isBookmarked
              ? 'border-[#D64545] bg-[#D64545]/15 text-[#D64545]'
              : 'border-app bg-surface-raised text-muted hover:text-main'
          }`}
          type="button"
          title="Save question for review"
        >
          <Bookmark size={12} fill={isBookmarked ? 'currentColor' : 'none'} />
          <span className="text-[10px] tracking-mono-label uppercase">
            {isBookmarked ? 'SAVED' : 'SAVE'}
          </span>
        </button>
      </div>

      {/* Question Prompt */}
      <div className="py-2">
        <h3 className="text-xl sm:text-2xl font-display font-medium text-main leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <QuestionOption
            key={option.label}
            option={option}
            isSelected={selectedAnswer === option.label}
            isCorrect={question.answer === option.label}
            selectedAnswer={selectedAnswer}
            onSelect={onChooseAnswer}
            disabled={Boolean(selectedAnswer)}
          />
        ))}
      </div>

      {/* Solution Banner */}
      <AnimatePresence>
        {selectedAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`p-5 rounded-lg border space-y-3 ${
              isCorrect
                ? 'border-[#10B981]/40 bg-[#10B981]/10 text-main'
                : 'border-[#D64545]/40 bg-[#D64545]/10 text-main'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 font-mono text-xs uppercase">
                {isCorrect ? (
                  <>
                    <CheckCircle size={16} className="text-[#10B981]" />
                    <span className="text-[#10B981] font-medium">CORRECT ANSWER VERIFIED</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-[#D64545]" />
                    <span className="text-[#D64545] font-medium">INCORRECT. CORRECT KEY IS {question.answer}</span>
                  </>
                )}
              </div>

              {question.solution && (
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="font-mono text-xs text-secondary hover:text-main underline uppercase cursor-pointer"
                  type="button"
                >
                  {showExplanation ? 'HIDE EXPLANATION' : 'VIEW EXPLANATION'}
                </button>
              )}
            </div>

            {/* Expandable Explanation */}
            {question.solution && showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs font-body text-secondary bg-surface p-4 rounded border border-app leading-relaxed"
              >
                <strong className="font-mono text-main block mb-1 text-[11px] uppercase tracking-mono-label">
                  ACADEMIC SOLUTION:
                </strong>
                {question.solution}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Bar */}
      <div className="flex justify-between items-center pt-6 hairline-t">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 rounded border border-app bg-surface text-xs font-mono text-main disabled:opacity-30 disabled:cursor-not-allowed flex items-center space-x-2 hover:border-[#D64545] transition-colors cursor-pointer"
          type="button"
        >
          <ArrowLeft size={13} />
          <span>PREVIOUS</span>
        </button>

        <button
          onClick={onFinish}
          className="px-5 py-2.5 rounded border border-[#D64545]/40 text-[#D64545] hover:bg-[#D64545]/15 text-xs font-mono tracking-mono-label uppercase transition-colors cursor-pointer"
          type="button"
        >
          FINISH EVALUATION
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          className="px-6 py-2.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono tracking-mono-label uppercase flex items-center space-x-2 transition-all cursor-pointer"
          type="button"
        >
          <span>NEXT</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
