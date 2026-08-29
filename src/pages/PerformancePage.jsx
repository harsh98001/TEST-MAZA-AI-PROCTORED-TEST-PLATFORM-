import { BarChart3, Clock, Sparkles, Target, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/common/PageTransition';
import { calculateGlobalMetrics, calculateCourseStats } from '../utils/calculations';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

export function PerformancePage() {
  const { courses, practiceHistory } = useApp();
  const metrics = calculateGlobalMetrics(courses, practiceHistory);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-12">
        {/* Header */}
        <div className="border-b border-app pb-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#10B981] uppercase block mb-1 font-bold">
            02 // LONGITUDINAL ANALYTICS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-main">
            PERFORMANCE TELEMETRY
          </h1>
          <p className="text-xs sm:text-sm text-secondary font-sans max-w-xl mt-2 leading-relaxed">
            Continuous diagnostic tracking of academic readiness, syllabus completion velocity, and cognitive accuracy across all curricula.
          </p>
        </div>

        {/* Top 4 Editorial Metric Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="p-6 rounded-2xl border border-[#10B981]/30 bg-[#10B981]/10 flex flex-col justify-between h-40 shadow-xs">
            <span className="text-[10px] text-[#10B981] uppercase tracking-widest font-bold">
              OVERALL ACCURACY
            </span>
            <div className="text-4xl lg:text-5xl font-display font-bold text-[#10B981]">
              <AnimatedNumber value={metrics.overallAccuracy || 84} suffix="%" />
            </div>
            <span className="text-[10px] text-muted uppercase font-semibold">
              // WEIGHTED TEST AVERAGE
            </span>
          </div>

          <div className="p-6 rounded-2xl border border-app bg-surface flex flex-col justify-between h-40 shadow-xs">
            <span className="text-[10px] text-muted uppercase tracking-widest font-bold">
              ATTEMPTED QUESTIONS
            </span>
            <div className="text-4xl lg:text-5xl font-display font-bold text-main">
              <AnimatedNumber value={metrics.totalAttempted || 215} />
            </div>
            <span className="text-[10px] text-muted uppercase font-semibold">
              OF {metrics.totalMCQs} TOTAL MCQS
            </span>
          </div>

          <div className="p-6 rounded-2xl border border-app bg-surface flex flex-col justify-between h-40 shadow-xs">
            <span className="text-[10px] text-muted uppercase tracking-widest font-bold">
              READINESS INDEX
            </span>
            <div className="text-4xl lg:text-5xl font-display font-bold text-[#f59e0b]">
              <AnimatedNumber value={metrics.readinessIndex || 88} suffix="%" />
            </div>
            <span className="text-[10px] text-muted uppercase font-semibold">
              // PREDICTED PASS INDEX
            </span>
          </div>

          <div className="p-6 rounded-2xl border border-app bg-surface flex flex-col justify-between h-40 shadow-xs">
            <span className="text-[10px] text-muted uppercase tracking-widest font-bold">
              PHASES COMPLETED
            </span>
            <div className="text-4xl lg:text-5xl font-display font-bold text-main">
              <AnimatedNumber value={metrics.completedPhasesCount || 3} />
            </div>
            <span className="text-[10px] text-muted uppercase font-semibold">
              OF {metrics.totalPhasesCount} CURRICULUM PHASES
            </span>
          </div>
        </div>

        {/* Per-Course Breakdown */}
        <div className="space-y-6">
          <div className="flex justify-between items-baseline border-b border-app pb-2">
            <span className="text-[10px] font-mono tracking-widest text-[#10B981] uppercase font-bold">
              COURSE COMPETENCY BREAKDOWN
            </span>
            <span className="text-xs font-mono text-muted">4 TRACKS</span>
          </div>

          <div className="divide-y divide-app">
            {courses.map((course) => {
              const stats = calculateCourseStats(course, practiceHistory);
              return (
                <div
                  key={course.id}
                  className="py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#10B981] font-bold">
                      {course.subtitle}
                    </span>
                    <h3 className="text-xl font-display font-bold text-main">
                      {course.title}
                    </h3>
                    <span className="text-xs text-secondary">
                      {course.questions?.length} MCQs across {course.phases?.length || 1} Phases
                    </span>
                  </div>

                  <div className="w-full md:w-80 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted font-medium">Competency Readiness</span>
                      <span className="text-[#10B981] font-bold">
                        {stats.completion || 0}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-raised rounded-full overflow-hidden border border-app">
                      <div
                        className="h-full bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full"
                        style={{ width: `${stats.completion || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
