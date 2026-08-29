import { useState, useMemo } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, Filter, Search, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CourseCard } from './CourseCard';

const CATEGORIES = [
  'All',
  'Computer Science',
  'Web Technologies',
  'Core Engineering',
  'Foundations & Aptitude',
];

export function CourseExplorer({ initialShowAll = false }) {
  const { courses, setCursorLabel } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(initialShowAll);

  const filteredCourses = useMemo(() => {
    let list = courses;

    // Filter by Category
    if (selectedCategory !== 'All') {
      list = list.filter((c) => c.category === selectedCategory);
    }

    // Filter by Search Term
    const term = searchTerm.trim().toLowerCase();
    if (term) {
      list = list.filter((course) =>
        [course.title, course.subtitle, course.description, course.id, course.category]
          .join(' ')
          .toLowerCase()
          .includes(term)
      );
    }

    return list;
  }, [courses, selectedCategory, searchTerm]);

  // If not searching, not filtering, and showAll is false, show the first 4 primary featured courses
  const displayedCourses = useMemo(() => {
    if (searchTerm || selectedCategory !== 'All' || showAll) {
      return filteredCourses;
    }
    return filteredCourses.slice(0, 4);
  }, [filteredCourses, searchTerm, selectedCategory, showAll]);

  const hiddenCount = filteredCourses.length - displayedCourses.length;

  return (
    <section className="space-y-10" id="courses">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 hairline-b pb-8">
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase block">
            01 / CURRICULA REPOSITORY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-main uppercase">
            CERTIFIED TRACKS
          </h2>
          <span className="text-xs font-mono text-muted block">
            [ {courses.length} UNIVERSITY TRACKS • 1,196 CERTIFIED MCQS ]
          </span>
        </div>

        {/* Inline Search */}
        <div className="w-full md:w-80 relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search tracks, units, or codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-3 rounded border border-app bg-surface text-xs font-mono text-main placeholder:text-muted outline-none focus:border-[#D64545] transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        {CATEGORIES.map((category) => {
          const count =
            category === 'All'
              ? courses.length
              : courses.filter((c) => c.category === category).length;
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowAll(true);
              }}
              className={`px-3.5 py-2 rounded border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#D64545] bg-surface-raised text-main font-medium shadow-xs'
                  : 'border-app bg-surface text-secondary hover:border-[#D64545]/50 hover:text-main'
              }`}
              type="button"
            >
              <span className="uppercase">{category}</span>
              <span className="text-[10px] text-muted ml-1.5 font-normal">
                [{count}]
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {displayedCourses.length === 0 ? (
        <div className="p-16 text-center border border-app rounded bg-surface space-y-2 font-mono">
          <p className="text-sm text-main">NO MATCHING CURRICULA FOUND</p>
          <p className="text-xs text-muted">Try clearing your filters or search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      )}

      {/* "BROWSE MORE" Action Bar (when collapsed) */}
      {!showAll && hiddenCount > 0 && !searchTerm && selectedCategory === 'All' && (
        <div className="pt-6 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            onMouseEnter={() => setCursorLabel('EXPLORE')}
            onMouseLeave={() => setCursorLabel('')}
            className="px-8 py-4 rounded border border-app bg-surface hover:border-[#D64545] text-main font-mono text-xs tracking-mono-label uppercase font-medium flex items-center space-x-3 transition-all shadow-md cursor-pointer hover:bg-surface-raised"
            type="button"
          >
            <span>BROWSE ALL 14 CURRICULA TRACKS [ +{hiddenCount} MORE ]</span>
            <ChevronDown size={14} className="text-[#D64545]" />
          </button>
        </div>
      )}

      {/* "COLLAPSE" Action Bar (when expanded manually on home) */}
      {showAll && !initialShowAll && !searchTerm && selectedCategory === 'All' && (
        <div className="pt-6 flex justify-center">
          <button
            onClick={() => setShowAll(false)}
            className="px-6 py-3 rounded border border-app bg-surface-raised text-secondary hover:text-main font-mono text-xs tracking-mono-label uppercase cursor-pointer"
            type="button"
          >
            COLLAPSE TO FEATURED TRACKS
          </button>
        </div>
      )}
    </section>
  );
}
