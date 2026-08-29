import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Layers, Lock, Shield, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { calculateCourseStats } from '../../utils/calculations';

export function CourseCard({ course, index = 0 }) {
  const navigate = useNavigate();
  const { practiceHistory, setCursorLabel } = useApp();
  const stats = calculateCourseStats(course, practiceHistory);

  const targetExamUrl = `/exam/${course.id}/phase-1`;
  const targetPracticeUrl = `/practice/${course.id}/phase-1`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex"
    >
      <div
        onMouseEnter={() => setCursorLabel('EXAM')}
        onMouseLeave={() => setCursorLabel('')}
        className="w-full flex flex-col justify-between p-8 rounded-lg border border-app bg-surface hover:border-[#D64545]/60 hover:bg-surface-raised transition-all duration-300 group relative overflow-hidden"
      >
        {/* Subtle Security Badge */}
        <div className="flex justify-between items-center text-xs font-mono mb-4">
          <span className="text-[#D64545] tracking-mono-label uppercase font-medium">
            [ {course.subtitle} ]
          </span>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#D64545]/10 border border-[#D64545]/20 text-[#D64545] text-[10px] tracking-mono-label uppercase">
              <ShieldCheck size={11} />
              <span>AI PROCTORED</span>
            </span>
            <span className="text-muted tracking-mono-label uppercase">
              {course.questions?.length || 0} MCQS
            </span>
          </div>
        </div>

        {/* Course Title & Description */}
        <div className="space-y-3">
          <Link to={targetExamUrl} className="block">
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-main tracking-tight leading-tight group-hover:text-[#D64545] transition-colors">
              {course.title}
            </h3>
          </Link>

          <p className="text-sm text-secondary font-body leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Readiness Bar & Direct Secured Exam CTAs */}
        <div className="pt-8 space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-muted tracking-mono-label uppercase">
              <span>COMPETENCY READINESS</span>
              <span className="text-main font-medium">{stats.completion || 0}%</span>
            </div>
            <div className="w-full h-[2px] bg-app overflow-hidden">
              <div
                className="h-full bg-[#D64545] transition-all duration-500"
                style={{ width: `${stats.completion || 0}%` }}
              />
            </div>
          </div>

          {/* Action Row: Primary "TAKE PROCTORED EXAM" Button */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              to={targetExamUrl}
              className="flex-1 py-3.5 px-4 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-[#D64545]/25"
            >
              <Shield size={14} className="text-white shrink-0" />
              <span>TAKE PROCTORED EXAM</span>
              <ArrowUpRight size={14} className="shrink-0" />
            </Link>

            <Link
              to={targetPracticeUrl}
              className="py-3.5 px-4 rounded border border-app bg-surface hover:border-[#D64545] text-secondary hover:text-main font-mono text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-1.5 transition-all"
              title="Untimed Practice Mode"
            >
              <BookOpen size={13} className="text-muted" />
              <span className="hidden sm:inline">PRACTICE</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
