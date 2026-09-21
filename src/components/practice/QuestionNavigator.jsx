import { Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function QuestionNavigator({
  questions = [],
  currentIndex = 0,
  answers = {},
  onSelectIndex,
}) {
  const { bookmarks } = useApp();

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className="flex justify-between items-center text-xs text-muted tracking-mono-label uppercase">
        <span>MATRIX GRID</span>
        <span>{questions.length} MCQS</span>
      </div>

      {/* Question Matrix */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 gap-2 max-h-72 overflow-y-auto pr-1">
        {questions.map((question, index) => {
          const answer = answers[question.id];

          const isCurrent = currentIndex === index;
          const isBookmarked = bookmarks.includes(question.id);
          const isCorrect = answer && answer === question.answer;
          const isWrong = answer && answer !== question.answer;
          const isUnanswered = !answer;

          let stateStyle =
            'border border-app bg-surface text-secondary hover:border-[#D64545]';

          // Current question gets highest priority
          if (isCurrent) {
            stateStyle =
              'border-2 border-[#D64545] bg-[#D64545] text-white font-medium';
          }
          // Saved for review
          else if (isBookmarked) {
            stateStyle =
              'border border-[#EAB308] bg-[#EAB308]/20 text-[#EAB308] font-medium';
          }
          // Correct answer
          else if (isCorrect) {
            stateStyle =
              'border border-[#10B981] bg-[#10B981]/20 text-[#10B981] font-medium';
          }
          // Wrong answer
          else if (isWrong) {
            stateStyle =
              'border border-[#D64545] bg-[#D64545]/20 text-[#D64545] font-medium';
          }
          // Unanswered
          else if (isUnanswered) {
            stateStyle =
              'border border-app bg-surface text-secondary hover:border-[#D64545]';
          }

          return (
            <button
              key={question.id}
              onClick={() => onSelectIndex(index)}
              className={`h-9 rounded text-xs flex items-center justify-center transition-all cursor-pointer ${stateStyle}`}
              type="button"
              title={
                isBookmarked
                  ? `Question ${index + 1} - Saved for Review`
                  : isCorrect
                    ? `Question ${index + 1} - Correct`
                    : isWrong
                      ? `Question ${index + 1} - Incorrect`
                      : `Question ${index + 1} - Unanswered`
              }
            >
              <div className="flex items-center gap-1">
                {isBookmarked && (
                  <Bookmark
                    size={10}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                )}

                <span>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9px] text-muted tracking-mono-label pt-3 hairline-t uppercase">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          Correct
        </span>

        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D64545]" />
          Incorrect
        </span>

        <span className="flex items-center gap-1.5">
          <Bookmark
            size={10}
            className="text-[#EAB308]"
            fill="currentColor"
            aria-hidden="true"
          />
          Review
        </span>

        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full border border-app" />
          Unanswered
        </span>
      </div>
    </div>
  );
}