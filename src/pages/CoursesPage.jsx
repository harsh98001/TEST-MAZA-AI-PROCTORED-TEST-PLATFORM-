import { PageTransition } from '../components/common/PageTransition';
import { CourseExplorer } from '../components/course/CourseExplorer';

export function CoursesPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-12">
        <div className="space-y-2 hairline-b pb-6">
          <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase block">
            ACADEMIC DIRECTORY // 01
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-main uppercase">
            UNIVERSITY CURRICULA
          </h1>
          <p className="text-xs sm:text-sm text-secondary font-body max-w-xl leading-relaxed">
            Explore complete syllabi, unit-wise competency breakdowns, and structured evaluation phases across 14 certified academic tracks.
          </p>
        </div>

        <CourseExplorer initialShowAll={true} />
      </div>
    </PageTransition>
  );
}
