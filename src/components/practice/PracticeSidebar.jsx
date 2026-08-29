import { QuestionNavigator } from './QuestionNavigator';

export function PracticeSidebar({
  questions = [],
  currentIndex = 0,
  answers = {},
  onSelectIndex,
  totalAnswered = 0,
  totalCorrect = 0,
  accuracy = 0,
}) {
  const totalWrong = totalAnswered - totalCorrect;

  return (
    <aside className="w-full space-y-6">
      {/* Session Metrics Widget */}
      <div className="p-6 rounded-lg border border-app bg-surface space-y-5 font-mono">
        <div className="flex justify-between items-center hairline-b pb-3 text-xs">
          <span className="text-muted tracking-mono-label uppercase">
            SESSION TELEMETRY
          </span>
          <span className="text-main font-medium">
            {accuracy}% SCORE
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-3 rounded bg-surface-raised border border-app">
            <span className="text-[9px] text-muted block uppercase mb-1">EVALUATED</span>
            <strong className="text-lg text-main font-medium">{totalAnswered}</strong>
          </div>
          <div className="p-3 rounded bg-[#10B981]/10 border border-[#10B981]/30">
            <span className="text-[9px] text-[#10B981] block uppercase mb-1">CORRECT</span>
            <strong className="text-lg text-[#10B981] font-medium">{totalCorrect}</strong>
          </div>
          <div className="p-3 rounded bg-[#D64545]/10 border border-[#D64545]/30">
            <span className="text-[9px] text-[#D64545] block uppercase mb-1">ERRORS</span>
            <strong className="text-lg text-[#D64545] font-medium">{totalWrong}</strong>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[10px] text-muted tracking-mono-label uppercase">
            <span>COMPLETION</span>
            <span className="text-main">
              {Math.round((totalAnswered / (questions.length || 1)) * 100)}%
            </span>
          </div>
          <div className="w-full h-[2px] bg-app overflow-hidden">
            <div
              className="h-full bg-[#D64545] transition-all duration-300"
              style={{ width: `${(totalAnswered / (questions.length || 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Navigator */}
      <div className="p-6 rounded-lg border border-app bg-surface">
        <QuestionNavigator
          questions={questions}
          currentIndex={currentIndex}
          answers={answers}
          onSelectIndex={onSelectIndex}
        />
      </div>
    </aside>
  );
}
