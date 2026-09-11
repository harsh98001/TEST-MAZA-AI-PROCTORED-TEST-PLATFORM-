import { ArrowUpRight, BookOpen, CheckCircle, GraduationCap, Layers, Radio, ShieldAlert, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/common/PageTransition';

export function FacultyPage() {
  const { courses } = useApp();

  const totalQuestions = courses.reduce((acc, c) => acc + (c.questions?.length || 0), 0);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-12">
        {/* Header */}
        <div className="hairline-b pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase mb-1 font-bold">
              <Users size={14} />
              <span>FACULTY ACADEMIC OVERSIGHT</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-main uppercase">
              CURRICULUM COMMAND
            </h1>
            <p className="text-xs sm:text-sm text-secondary font-body max-w-xl mt-2 leading-relaxed">
              Review syllabus unit coverage, question bank distribution, and supervise real-time exam telemetry.
            </p>
          </div>

          {/* Live Monitor Quick CTA */}
          <Link
            to="/faculty/live"
            className="px-5 py-3 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium flex items-center space-x-2 transition-all shadow-md"
          >
            <Radio size={14} className="animate-pulse" />
            <span>OPEN LIVE EXAM ROOM</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Coverage Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="p-6 rounded-lg border border-app bg-surface space-y-2 shadow-xs">
            <span className="text-[10px] text-muted uppercase font-bold">TOTAL QUESTION REPOSITORY</span>
            <div className="text-4xl font-display font-bold text-main">{totalQuestions} MCQS</div>
            <span className="text-[10px] text-[#10B981] block font-semibold">// ALL 14 CURRICULA CERTIFIED</span>
          </div>

          <div className="p-6 rounded-lg border border-app bg-surface space-y-2 shadow-xs">
            <span className="text-[10px] text-muted uppercase font-bold">ACTIVE TRACKS & UNITS</span>
            <div className="text-4xl font-display font-bold text-[#f59e0b]">14 TRACKS</div>
            <span className="text-[10px] text-muted block font-semibold">// 100% SYLLABUS ALIGNMENT</span>
          </div>

          <div className="p-6 rounded-lg border border-app bg-surface space-y-2 shadow-xs">
            <span className="text-[10px] text-muted uppercase font-bold">PROCTORING INTEGRITY INDEX</span>
            <div className="text-4xl font-display font-bold text-[#10B981]">99.2%</div>
            <span className="text-[10px] text-[#10B981] block font-semibold">// BIOMETRIC WATCHDOG ACTIVE</span>
          </div>
        </div>

        {/* Unit Breakdown Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline border-b border-app pb-2">
            <span className="text-[10px] font-mono tracking-widest text-[#D64545] uppercase font-bold">
              CURRICULUM INVENTORY & UNIT WEIGHTAGE
            </span>
            <span className="text-xs font-mono text-muted">ACADEMIC VERIFICATION</span>
          </div>

          <div className="divide-y divide-app">
            {courses.map((course) => (
              <div key={course.id} className="py-6 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono text-[#D64545] font-bold">
                      {course.subtitle}
                    </span>
                    <h3 className="text-xl font-display font-bold text-main">
                      {course.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#10B981] font-bold bg-[#10B981]/10 px-2.5 py-1 rounded border border-[#10B981]/30">
                    {course.questions?.length || 0} MCQS CERTIFIED
                  </span>
                </div>
                <p className="text-xs text-secondary font-body leading-relaxed">
                  {course.questionNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
