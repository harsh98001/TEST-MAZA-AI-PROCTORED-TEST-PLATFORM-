import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './layouts/AppShell';
import { RouteLoadingFallback } from './components/common/RouteLoadingFallback';

// Lazy-loaded route components for high performance code-splitting
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const CoursesPage = lazy(() => import('./pages/CoursesPage').then((m) => ({ default: m.CoursesPage })));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage').then((m) => ({ default: m.CourseDetailPage })));
const PracticePage = lazy(() => import('./pages/PracticePage').then((m) => ({ default: m.PracticePage })));
const ExamPage = lazy(() => import('./pages/ExamPage').then((m) => ({ default: m.ExamPage })));
const ReviewPage = lazy(() => import('./pages/ReviewPage').then((m) => ({ default: m.ReviewPage })));
const PerformancePage = lazy(() => import('./pages/PerformancePage').then((m) => ({ default: m.PerformancePage })));
const FacultyPage = lazy(() => import('./pages/FacultyPage').then((m) => ({ default: m.FacultyPage })));
const LiveExamMonitorPage = lazy(() => import('./pages/faculty/LiveExamMonitorPage').then((m) => ({ default: m.LiveExamMonitorPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// The Arena Module (Code-split separately to avoid heavy initial bundle)
const ArenaLandingPage = lazy(() => import('./pages/arena/ArenaLandingPage').then((m) => ({ default: m.ArenaLandingPage })));
const ArenaWorkspacePage = lazy(() => import('./pages/arena/ArenaWorkspacePage').then((m) => ({ default: m.ArenaWorkspacePage })));

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            {/* Main App Layout */}
            <Route element={<AppShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:courseId" element={<CourseDetailPage />} />
              <Route path="/practice/:courseId/:phaseId" element={<PracticePage />} />
              <Route path="/exam/:courseId/:phaseId" element={<ExamPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/faculty/live" element={<LiveExamMonitorPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/arena" element={<ArenaLandingPage />} />
            </Route>

            {/* Standalone IDE Layout */}
            <Route path="/arena/:trackId" element={<ArenaWorkspacePage />} />
            <Route path="/arena/:trackId/:questionSlug" element={<ArenaWorkspacePage />} />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
