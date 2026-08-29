import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle, RotateCcw, ShieldCheck, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScoreRing } from './ScoreRing';
import { UnitPerformance } from './UnitPerformance';
import { WrongAnswerRow } from './WrongAnswerRow';
import { getGrade } from '../../utils/formatters';

export function CompletionScreen({
  courseTitle,
  phaseTitle,
  accuracy = 0,
  totalCorrect = 0,
  totalAnswered = 0,
  totalQuestions = 0,
  elapsedTimeFormatted = '00:00',
  unitStats = [],
  wrongQuestions = [],
  onRestart,
  onNextPhase,
  hasNextPhase,
}) {
  const grade = getGrade(accuracy);
  const totalWrong = totalAnswered - totalCorrect;

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10 px-4">
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase block">
          EVALUATION AUDIT // {phaseTitle}
        </span>
        <h2 className="text-4xl sm:text-6xl font-display font-medium text-main uppercase leading-tight">
          {grade.label}
        </h2>
        <p className="text-sm text-secondary font-body max-w-lg leading-relaxed">
          {grade.note}
        </p>
      </motion.div>

      {/* Main Score & Metrics Hero */}
      <div className="p-8 md:p-10 rounded-lg border border-app bg-surface grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left: Score Ring */}
        <div className="flex justify-center md:border-r border-app md:pr-8">
          <ScoreRing accuracy={accuracy} size={160} />
        </div>

        {/* Right: 4 Metrics Grid */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4 font-mono">
          <div className="p-5 rounded bg-surface-raised border border-app">
            <span className="text-[10px] text-[#10B981] tracking-mono-label uppercase block mb-1">CORRECT</span>
            <strong className="text-3xl text-[#10B981] font-medium">{totalCorrect}</strong>
            <span className="text-[10px] text-muted block mt-1">OF {totalAnswered} ANSWERED</span>
          </div>

          <div className="p-5 rounded bg-surface-raised border border-app">
            <span className="text-[10px] text-[#D64545] tracking-mono-label uppercase block mb-1">ERRORS</span>
            <strong className="text-3xl text-[#D64545] font-medium">{totalWrong}</strong>
            <span className="text-[10px] text-muted block mt-1">FLAGGED FOR REVIEW</span>
          </div>

          <div className="p-5 rounded bg-surface-raised border border-app">
            <span className="text-[10px] text-muted tracking-mono-label uppercase block mb-1">COVERAGE</span>
            <strong className="text-3xl text-main font-medium">{totalAnswered}/{totalQuestions}</strong>
            <span className="text-[10px] text-muted block mt-1">PHASE QUESTIONS</span>
          </div>

          <div className="p-5 rounded bg-surface-raised border border-app">
            <span className="text-[10px] text-muted tracking-mono-label uppercase block mb-1">DURATION</span>
            <strong className="text-3xl text-main font-medium">{elapsedTimeFormatted}</strong>
            <span className="text-[10px] text-muted block mt-1">ELAPSED TIME</span>
          </div>
        </div>
      </div>

      {/* Unit Performance Breakdown */}
      {unitStats.length > 0 && (
        <div className="p-8 rounded-lg border border-app bg-surface space-y-6">
          <div className="flex justify-between items-baseline hairline-b pb-4">
            <div>
              <h4 className="text-xl font-display font-medium text-main uppercase">Unit Telemetry</h4>
              <span className="text-xs font-mono text-muted">Competency breakdown per unit</span>
            </div>
            <span className="text-xs font-mono text-[#D64545]">
              {unitStats.length} UNITS
            </span>
          </div>

          <UnitPerformance unitStats={unitStats} />
        </div>
      )}

      {/* Mistake Review List */}
      {wrongQuestions.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-baseline hairline-b pb-4">
            <div>
              <h4 className="text-xl font-display font-medium text-[#D64545] uppercase">Mistake Post-Mortem</h4>
              <span className="text-xs font-mono text-muted">{wrongQuestions.length} questions to analyze and master</span>
            </div>
            <span className="text-xs font-mono text-muted">
              SOLUTIONS INCLUDED
            </span>
          </div>

          <div className="space-y-3">
            {wrongQuestions.map((q) => (
              <WrongAnswerRow
                key={q.id}
                question={q}
                userAnswer={q.userAnswer}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-lg border border-[#10B981]/40 bg-[#10B981]/10 text-center space-y-2 font-mono">
          <h4 className="text-lg text-[#10B981] font-medium">
            100% ACCURACY ACHIEVED
          </h4>
          <p className="text-xs text-muted">
            Zero incorrect responses recorded during this evaluation.
          </p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-wrap justify-between items-center gap-4 pt-6 hairline-t font-mono">
        <Link
          to="/courses"
          className="px-6 py-3 rounded border border-app bg-surface text-xs text-main hover:border-[#D64545] uppercase"
        >
          ← ALL CURRICULA
        </Link>

        <div className="flex items-center space-x-3">
          <button
            onClick={onRestart}
            className="px-6 py-3 rounded border border-app bg-surface-raised text-xs text-main hover:border-[#D64545] flex items-center space-x-2 uppercase cursor-pointer"
            type="button"
          >
            <RotateCcw size={13} />
            <span>RETRY EVALUATION</span>
          </button>

          {hasNextPhase && (
            <button
              onClick={onNextPhase}
              className="px-7 py-3 rounded bg-[#D64545] hover:bg-[#E05656] text-white text-xs tracking-mono-label flex items-center space-x-2 uppercase cursor-pointer"
              type="button"
            >
              <span>NEXT PHASE</span>
              <ArrowUpRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
