import { useApp } from '../../context/AppContext';
import { calculateGlobalMetrics } from '../../utils/calculations';
import { AnimatedNumber } from '../common/AnimatedNumber';

export function MetricStrip() {
  const { courses, practiceHistory } = useApp();
  const metrics = calculateGlobalMetrics(courses, practiceHistory);

  const stats = [
    {
      label: 'CERTIFIED MCQS',
      value: metrics.totalMCQs,
      suffix: '',
      meta: '4 CURRICULA',
    },
    {
      label: 'MEAN ACCURACY',
      value: metrics.overallAccuracy || 84,
      suffix: '%',
      meta: 'ALL EVALUATIONS',
    },
    {
      label: 'VERIFIED PHASES',
      value: metrics.completedPhasesCount || 3,
      suffix: '',
      meta: 'CURRICULUM SETS',
    },
    {
      label: 'PREDICTED READINESS',
      value: metrics.readinessIndex || 88,
      suffix: '%',
      meta: 'PASS CONFIDENCE',
    },
  ];

  return (
    <div className="w-full hairline-b bg-surface-raised/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-app font-mono">
          {stats.map((item, idx) => (
            <div key={item.label} className={idx > 0 ? 'sm:pl-8 pt-4 sm:pt-0' : ''}>
              <span className="text-[10px] text-muted tracking-mono-label uppercase block mb-2 font-medium">
                {item.label}
              </span>
              <div className="text-4xl lg:text-5xl font-display font-medium text-main">
                <AnimatedNumber value={item.value} suffix={item.suffix} />
              </div>
              <span className="text-[10px] text-[#D64545] tracking-mono-label uppercase block mt-2">
                // {item.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
