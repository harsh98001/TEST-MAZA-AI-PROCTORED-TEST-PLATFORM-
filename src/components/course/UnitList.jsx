import { BookOpen, Layers } from 'lucide-react';
import { extractUnitStats } from '../../utils/calculations';

export function UnitList({ questions = [] }) {
  const units = extractUnitStats(questions, {});

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline border-b border-app pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#10B981] uppercase block font-bold">
            SYLLABUS BREAKDOWN
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-main">
            UNIT COMPOSITION ({units.length} UNITS)
          </h3>
        </div>
        <span className="text-xs font-mono text-muted">
          {questions.length} TOTAL MCQS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {units.map((unit, idx) => (
          <div
            key={unit.unit}
            className="p-5 rounded-2xl border border-app bg-surface flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-md border border-[#10B981]/30 font-bold">
                UNIT 0{idx + 1}
              </span>
              <span className="text-xs font-mono text-secondary font-semibold">
                {unit.total} QUESTIONS
              </span>
            </div>

            <div>
              <h4 className="text-base font-display font-bold text-main">
                {unit.unit.replace(/^UNIT\s+[IVXLCDM]+\s*[-–:]\s*/i, '')}
              </h4>
            </div>

            <div className="pt-3 border-t border-app flex justify-between items-center text-xs font-mono text-muted">
              <span>Coverage Share</span>
              <span className="text-main font-bold">
                {Math.round((unit.total / questions.length) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
