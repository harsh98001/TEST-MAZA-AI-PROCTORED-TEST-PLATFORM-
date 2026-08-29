import { BookOpen, CheckCircle, GraduationCap, Layers, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/common/PageTransition';

export function FacultyPage() {
  const { courses } = useApp();

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-12">
        {/* Header */}
        <div className="border-b border-app pb-6 flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#f59e0b] uppercase mb-1 font-bold">
              <Users size={14} />
              <span>FACULTY ACADEMIC OVERSIGHT</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-main">
              CURRICULUM COMMAND
            </h1>
            <p className="text-xs sm:text-sm text-secondary font-sans max-w-xl mt-2 leading-relaxed">
              Review syllabus unit coverage, question bank distribution, and pedagogical readiness benchmarks.
            </p>
          </div>
        </div>

        {/* Coverage Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="p-6 rounded-2xl border border-app bg-surface space-y-2 shadow-xs">
            <span className="text-[10px] text-muted uppercase font-bold">TOTAL QUESTION REPOSITORY</span>
            <div className="text-4xl font-display font-bold text-main">476 MCQS</div>
            <span className="text-[10px] text-[#10B981] block font-semibold">// ALL 4 CURRICULA CERTIFIED</span>
          </div>

          <div className="p-6 rounded-2xl border border-app bg-surface space-y-2 shadow-xs">
            <span className="text-[10px] text-muted uppercase font-bold">ACTIVE UNITS COVERED</span>
            <div className="text-4xl font-display font-bold text-[#f59e0b]">18 UNITS</div>
            <span className="text-[10px] text-muted block font-semibold">// 100% SYLLABUS ALIGNMENT</span>
          </div>

          <div className="p-6 rounded-2xl border border-app bg-surface space-y-2 shadow-xs">
            <span className="text-[10px] text-muted uppercase font-bold">STUDENT READINESS INDEX</span>
            <div className="text-4xl font-display font-bold text-[#10B981]">87.4%</div>
            <span className="text-[10px] text-[#10B981] block font-semibold">// PASS THRESHOLD SATISFIED</span>
          </div>
        </div>

        {/* Unit Breakdown Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline border-b border-app pb-2">
            <span className="text-[10px] font-mono tracking-widest text-[#f59e0b] uppercase font-bold">
              CURRICULUM INVENTORY & UNIT WEIGHTAGE
            </span>
            <span className="text-xs font-mono text-muted">ACADEMIC VERIFICATION</span>
          </div>

          <div className="divide-y divide-app">
            {courses.map((course) => (
              <div key={course.id} className="py-6 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono text-[#f59e0b] font-bold">
                      {course.subtitle}
                    </span>
                    <h3 className="text-xl font-display font-bold text-main">
                      {course.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#10B981] font-bold bg-[#10B981]/10 px-2.5 py-1 rounded-md border border-[#10B981]/30">
                    {course.questions?.length} MCQS CERTIFIED
                  </span>
                </div>
                <p className="text-xs text-secondary font-sans leading-relaxed">
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
