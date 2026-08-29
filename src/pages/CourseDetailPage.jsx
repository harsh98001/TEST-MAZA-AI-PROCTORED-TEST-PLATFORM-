import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/common/PageTransition';
import { PhaseTimeline } from '../components/course/PhaseTimeline';
import { UnitList } from '../components/course/UnitList';
import { calculateCourseStats } from '../utils/calculations';

export function CourseDetailPage() {
  const { courseId } = useParams();
  const { courses, practiceHistory, setCursorLabel } = useApp();

  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const stats = calculateCourseStats(course, practiceHistory);
  const phases = course.phases || [];
  const firstPhaseId = phases[0]?.id || 'phase-1';

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-12">
        {/* Back Link */}
        <Link
          to="/courses"
          className="inline-flex items-center space-x-2 text-xs font-mono text-secondary hover:text-main transition-colors uppercase font-bold"
        >
          <ArrowLeft size={13} />
          <span>BACK TO ALL COURSES</span>
        </Link>

        {/* Hero Header */}
        <div className="p-8 md:p-12 rounded-3xl border border-app bg-surface relative overflow-hidden space-y-6 shadow-sm">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#10B981] border border-[#10B981]/30 bg-[#10B981]/15 px-3 py-1 rounded-md inline-block font-bold">
                {course.subtitle}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-main">
                {course.title}
              </h1>
              <p className="text-sm md:text-base text-secondary font-sans max-w-2xl leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to={`/practice/${course.id}/${firstPhaseId}`}
                onMouseEnter={() => setCursorLabel('START')}
                onMouseLeave={() => setCursorLabel('')}
                className="px-6 py-3.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-[#10B981]/25 text-center"
              >
                PRACTICE PHASE 01 →
              </Link>
              <Link
                to={`/exam/${course.id}/${firstPhaseId}`}
                className="px-6 py-3.5 rounded-xl border border-app bg-surface-raised hover:border-[#f59e0b] hover:bg-surface text-secondary hover:text-[#f59e0b] font-mono text-xs font-bold tracking-wider uppercase transition-all text-center flex items-center justify-center space-x-2 shadow-xs"
              >
                <Shield size={14} className="text-[#f59e0b]" />
                <span>EXAM MODE</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-app font-mono">
            <div>
              <span className="text-[10px] text-muted uppercase block font-bold">TOTAL MCQS</span>
              <strong className="text-2xl text-main">{course.questions?.length || 0}</strong>
            </div>
            <div>
              <span className="text-[10px] text-muted uppercase block font-bold">PHASES</span>
              <strong className="text-2xl text-main">{phases.length || 1}</strong>
            </div>
            <div>
              <span className="text-[10px] text-muted uppercase block font-bold">ATTEMPTED</span>
              <strong className="text-2xl text-[#10B981]">{stats.totalAttempted}</strong>
            </div>
            <div>
              <span className="text-[10px] text-muted uppercase block font-bold">READINESS</span>
              <strong className="text-2xl text-[#10B981]">{stats.completion}%</strong>
            </div>
          </div>
        </div>

        {/* Phase Progression Timeline */}
        <PhaseTimeline course={course} />

        {/* Unit Breakdown */}
        <UnitList questions={course.questions || []} />
      </div>
    </PageTransition>
  );
}
