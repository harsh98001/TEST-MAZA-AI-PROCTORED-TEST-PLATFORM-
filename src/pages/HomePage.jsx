import { PageTransition } from '../components/common/PageTransition';
import { HeroSection } from '../components/dashboard/HeroSection';
import { MetricStrip } from '../components/dashboard/MetricStrip';
import { CourseExplorer } from '../components/course/CourseExplorer';
import { WeakTopicsBanner } from '../components/dashboard/WeakTopicsBanner';
import { ActivityJournal } from '../components/dashboard/ActivityJournal';

export function HomePage() {
  return (
    <PageTransition>
      <div className="space-y-16 pb-16">
        <HeroSection />
        <MetricStrip />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <WeakTopicsBanner />
          <CourseExplorer />
          <ActivityJournal />
        </div>
      </div>
    </PageTransition>
  );
}
