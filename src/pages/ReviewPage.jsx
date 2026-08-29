import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle, HelpCircle, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/common/PageTransition';
import { WrongAnswerRow } from '../components/review/WrongAnswerRow';

export function ReviewPage() {
  const { courses, practiceHistory } = useApp();
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'php');

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  // Aggregate wrong questions for this course
  const wrongQuestions = [];
  const phases = selectedCourse?.phases || [{ id: 'phase-1' }];

  phases.forEach((phase) => {
    const key = `${selectedCourse.id}_${phase.id}`;
    const result = practiceHistory[key];
    if (result && result.answers) {
      selectedCourse.questions?.forEach((q) => {
        if (result.answers[q.id] && result.answers[q.id] !== q.answer) {
          if (!wrongQuestions.some((item) => item.id === q.id)) {
            wrongQuestions.push({
              ...q,
              userAnswer: result.answers[q.id],
            });
          }
        }
      });
    }
  });

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-10">
        {/* Header */}
        <div className="border-b border-app pb-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#10B981] uppercase block mb-1 font-bold">
            03 // MISTAKE ANALYSIS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-main">
            REVIEW & STEP-BY-STEP SOLUTIONS
          </h1>
          <p className="text-xs sm:text-sm text-secondary font-sans max-w-xl mt-2 leading-relaxed">
            Audit your incorrect responses with academic explanations and step-by-step reasoning to eliminate misconceptions.
          </p>
        </div>

        {/* Course Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer shadow-xs ${
                selectedCourseId === course.id
                  ? 'border-[#10B981] bg-[#10B981]/15 text-[#10B981] font-bold shadow-xs'
                  : 'border-app bg-surface text-secondary hover:border-[#10B981]/40'
              }`}
              type="button"
            >
              {course.title} ({course.subtitle})
            </button>
          ))}
        </div>

        {/* Mistake List */}
        {wrongQuestions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-app bg-surface space-y-4 max-w-xl mx-auto shadow-sm">
            <CheckCircle size={36} className="text-[#10B981] mx-auto" />
            <h3 className="text-2xl font-display font-bold text-main">
              NO MISTAKES RECORDED
            </h3>
            <p className="text-xs text-secondary font-sans leading-relaxed">
              You currently have no recorded errors for {selectedCourse.title}. Complete a practice or exam session to populate detailed solution reviews.
            </p>
            <Link
              to={`/practice/${selectedCourse.id}/phase-1`}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#10B981] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#059669] transition-all shadow-md"
            >
              <span>COMMENCE PRACTICE →</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-baseline border-b border-app pb-2">
              <span className="text-[10px] font-mono text-[#f43f5e] uppercase tracking-widest font-bold">
                {wrongQuestions.length} FLAGGED MISTAKES IN {selectedCourse.title}
              </span>
              <span className="text-xs font-mono text-muted">
                CLICK ANY ROW TO VIEW SOLUTION
              </span>
            </div>

            <div className="space-y-3">
              {wrongQuestions.map((q) => (
                <WrongAnswerRow
                  key={q.id}
                  question={q}
                  userAnswer={q.userAnswer}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
