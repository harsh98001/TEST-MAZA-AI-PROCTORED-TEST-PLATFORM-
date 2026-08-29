import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Search, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, courses } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term || term.length < 2) return { courses: [], questions: [] };

    // Search courses
    const matchedCourses = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.subtitle.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
    );

    // Search questions across all courses
    const matchedQuestions = [];
    courses.forEach((course) => {
      course.questions?.forEach((q) => {
        if (
          q.question.toLowerCase().includes(term) ||
          q.unit?.toLowerCase().includes(term) ||
          q.solution?.toLowerCase().includes(term)
        ) {
          matchedQuestions.push({
            ...q,
            courseId: course.id,
            courseTitle: course.title,
          });
        }
      });
    });

    return {
      courses: matchedCourses.slice(0, 4),
      questions: matchedQuestions.slice(0, 15),
    };
  }, [searchTerm, courses]);

  const handleCourseClick = (courseId) => {
    setIsSearchOpen(false);
    navigate(`/course/${courseId}`);
  };

  const handleQuestionClick = (courseId) => {
    setIsSearchOpen(false);
    navigate(`/practice/${courseId}/phase-1`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-surface/98 backdrop-blur-2xl flex flex-col p-6 md:p-12 overflow-y-auto text-main transition-colors"
        >
          {/* Search Header */}
          <div className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-app pb-6">
            <div className="flex items-center space-x-4 flex-1">
              <Search size={22} className="text-[#10B981]" />
              <input
                type="text"
                autoFocus
                placeholder="Search across all syllabi, questions, or solutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xl md:text-2xl font-display font-bold text-main placeholder:text-muted outline-none"
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-4 p-2 text-secondary hover:text-main border border-app bg-surface-raised rounded-lg transition-colors cursor-pointer shadow-xs"
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Content */}
          <div className="max-w-4xl mx-auto w-full py-8 space-y-8 flex-1">
            {searchTerm.length < 2 ? (
              <div className="text-center py-16 text-xs font-mono tracking-widest text-muted uppercase">
                ENTER AT LEAST 2 CHARACTERS TO COMMENCE SEARCH
              </div>
            ) : searchResults.courses.length === 0 && searchResults.questions.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <p className="text-sm font-mono text-main font-bold">NO RESULTS FOUND</p>
                <p className="text-xs text-muted">
                  Try searching for terms like "Supervised", "PHP", "Propositional", or "Time & Work".
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Matched Courses */}
                {searchResults.courses.length > 0 && (
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#10B981] uppercase block mb-3 font-bold">
                      MATCHED COURSES ({searchResults.courses.length})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {searchResults.courses.map((course) => (
                        <div
                          key={course.id}
                          onClick={() => handleCourseClick(course.id)}
                          className="p-4 rounded-xl border border-app bg-surface-raised hover:border-[#10B981]/50 cursor-pointer transition-all flex justify-between items-center group shadow-xs"
                        >
                          <div>
                            <span className="text-[10px] font-mono text-muted">{course.subtitle}</span>
                            <h4 className="text-sm font-bold text-main group-hover:text-[#10B981] transition-colors">
                              {course.title}
                            </h4>
                            <span className="text-xs text-secondary">
                              {course.questions?.length} Questions
                            </span>
                          </div>
                          <ArrowRight size={16} className="text-muted group-hover:text-[#10B981] transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Questions */}
                {searchResults.questions.length > 0 && (
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#10B981] uppercase block mb-3 font-bold">
                      MATCHED QUESTIONS ({searchResults.questions.length})
                    </span>
                    <div className="space-y-2.5">
                      {searchResults.questions.map((q) => (
                        <div
                          key={`${q.courseId}-${q.id}`}
                          onClick={() => handleQuestionClick(q.courseId)}
                          className="p-4 rounded-xl border border-app bg-surface-raised hover:border-[#10B981]/50 cursor-pointer transition-all group shadow-xs"
                        >
                          <div className="flex justify-between items-start gap-4 mb-1">
                            <span className="text-[10px] font-mono text-[#10B981] font-bold">
                              {q.courseTitle} // {q.unit}
                            </span>
                            <span className="text-[10px] font-mono text-muted">Q{q.id}</span>
                          </div>
                          <p className="text-xs md:text-sm text-main group-hover:text-[#10B981] transition-colors font-medium">
                            {q.question}
                          </p>
                          {q.solution && (
                            <p className="text-[11px] text-muted mt-2 line-clamp-1">
                              Solution snippet: {q.solution}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
