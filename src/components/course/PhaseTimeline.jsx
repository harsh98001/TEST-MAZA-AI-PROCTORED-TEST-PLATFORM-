import { CheckCircle, Lock, Play, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export function PhaseTimeline({ course }) {
  const { practiceHistory, setCursorLabel } = useApp();
  const phases = course.phases || [];

  if (phases.length === 0) {
    // Single Phase fallback
    const result = practiceHistory[course.id];
    return (
      <div className="p-6 rounded-2xl border border-app bg-surface shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] font-mono text-[#10B981] uppercase block font-bold">
              FULL SYLLABUS TRACK
            </span>
            <h4 className="text-xl font-display font-bold text-main">
              Complete {course.title} Question Bank
            </h4>
            <span className="text-xs text-secondary">
              {course.questions?.length || 0} Questions Available
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to={`/practice/${course.id}/phase-1`}
              className="px-5 py-2.5 rounded-lg bg-[#10B981] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#059669] transition-all shadow-xs"
            >
              PRACTICE →
            </Link>
            <Link
              to={`/exam/${course.id}/phase-1`}
              className="px-5 py-2.5 rounded-lg border border-app bg-surface-raised hover:border-[#f59e0b] text-secondary hover:text-[#f59e0b] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
            >
              PROCTORED EXAM
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline border-b border-app pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#10B981] uppercase block font-bold">
            PROGRESSION TIMELINE
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-main">
            PHASE SEQUENCE ({phases.length} PHASES)
          </h3>
        </div>
        <span className="text-xs font-mono text-muted">
          {phases[0]?.questions?.length} MCQS PER PHASE
        </span>
      </div>

      <div className="divide-y divide-app">
        {phases.map((phase, idx) => {
          const key = `${course.id}_${phase.id}`;
          const result = practiceHistory[key];
          const isComplete = Boolean(result);
          const accuracy = result?.accuracy || 0;

          return (
            <div
              key={phase.id}
              className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-surface-raised px-3 rounded-xl transition-colors group"
            >
              {/* Left Indicator & Info */}
              <div className="flex items-start space-x-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold shadow-xs ${
                    isComplete
                      ? 'border border-[#10B981]/50 bg-[#10B981]/15 text-[#10B981]'
                      : 'border border-app bg-surface-raised text-secondary'
                  }`}
                >
                  {isComplete ? <CheckCircle size={18} /> : `0${idx + 1}`}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-base md:text-lg font-display font-bold text-main group-hover:text-[#10B981] transition-colors">
                      {phase.title}
                    </h4>
                    <span className="text-[10px] font-mono text-muted">
                      // {phase.rangeLabel}
                    </span>
                  </div>
                  <p className="text-xs text-secondary">
                    {phase.questions?.length} Curated Examination Questions
                  </p>
                </div>
              </div>

              {/* Right Result Badge & Actions */}
              <div className="flex items-center space-x-3 self-end md:self-auto">
                {isComplete ? (
                  <div className="text-right mr-2">
                    <span className="text-[10px] font-mono text-muted uppercase block font-bold">
                      SCORE
                    </span>
                    <span className="text-sm font-mono font-bold text-[#10B981]">
                      {result.correct}/{result.total} ({accuracy}%)
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] font-mono text-muted uppercase mr-2 font-bold">
                    AVAILABLE
                  </span>
                )}

                <Link
                  to={`/practice/${course.id}/${phase.id}`}
                  onMouseEnter={() => setCursorLabel('START')}
                  onMouseLeave={() => setCursorLabel('')}
                  className="px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                >
                  {isComplete ? 'RETAKE' : 'PRACTICE'}
                </Link>

                <Link
                  to={`/exam/${course.id}/${phase.id}`}
                  className="p-2 rounded-lg border border-app bg-surface-raised hover:border-[#f59e0b] hover:text-[#f59e0b] text-secondary transition-all shadow-xs"
                  title="Launch Proctored Exam for this Phase"
                >
                  <Shield size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
