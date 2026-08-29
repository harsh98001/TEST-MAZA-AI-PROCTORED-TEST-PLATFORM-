export function QuestionNavigator({
  questions = [],
  currentIndex = 0,
  answers = {},
  onSelectIndex,
}) {
  return (
    <div className="space-y-4 font-mono">
      <div className="flex justify-between items-center text-xs text-muted tracking-mono-label uppercase">
        <span>MATRIX GRID</span>
        <span>{questions.length} MCQS</span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 gap-2 max-h-72 overflow-y-auto pr-1">
        {questions.map((question, index) => {
          const answer = answers[question.id];
          const isCurrent = currentIndex === index;
          const isCorrect = answer && answer === question.answer;
          const isWrong = answer && answer !== question.answer;

          let stateStyle = 'border border-app bg-surface text-secondary hover:border-[#D64545]';
          if (isCurrent) {
            stateStyle = 'border-2 border-[#D64545] bg-[#D64545] text-white font-medium';
          } else if (isCorrect) {
            stateStyle = 'border border-[#10B981] bg-[#10B981]/20 text-[#10B981] font-medium';
          } else if (isWrong) {
            stateStyle = 'border border-[#D64545] bg-[#D64545]/20 text-[#D64545] font-medium';
          }

          return (
            <button
              key={question.id}
              onClick={() => onSelectIndex(index)}
              className={`h-9 rounded text-xs flex items-center justify-center transition-all cursor-pointer ${stateStyle}`}
              type="button"
              title={`Question ${index + 1}`}
            >
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[9px] text-muted tracking-mono-label pt-3 hairline-t uppercase">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Correct
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D64545]" /> Error
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white border border-[#D64545]" /> Active
        </span>
      </div>
    </div>
  );
}
