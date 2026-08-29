import { motion } from 'framer-motion';

export function UnitPerformance({ unitStats = [] }) {
  if (unitStats.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-3.5">
        {unitStats.map((unit) => {
          const accuracy = unit.accuracy || (unit.total > 0 ? Math.round((unit.correct / unit.total) * 100) : 0);
          return (
            <div key={unit.unit} className="space-y-1.5 p-3 rounded-xl bg-surface-raised border border-app shadow-xs">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-main font-bold truncate max-w-xs sm:max-w-md">
                  {unit.unit.replace('UNIT ', 'Unit ')}
                </span>
                <span className="text-secondary font-semibold">
                  {unit.correct}/{unit.total} correct ({accuracy}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-app rounded-full overflow-hidden border border-app/60">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${accuracy}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full rounded-full ${
                    accuracy >= 75
                      ? 'bg-gradient-to-r from-[#10B981] to-[#34D399]'
                      : accuracy >= 50
                      ? 'bg-gradient-to-r from-[#f59e0b] to-[#fbbf24]'
                      : 'bg-gradient-to-r from-[#f43f5e] to-[#fb7185]'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
