export const APP_NAME = 'TEST MAZA';
export const APP_SUBTITLE = 'MIX MAZA ACADEMIC ARENA & PROCTORING PLATFORM';

export const AUTO_ADVANCE_DELAY_MS = 700;
export const FULLSCREEN_EXIT_LIMIT = 5;
export const PROCTOR_VIOLATION_LIMIT = 3;

export const STORAGE_KEYS = {
  USER: 'test_maza_user_v2',
  THEME: 'test_maza_theme_v2',
  PRACTICE_HISTORY: 'test_maza_practice_history_v2',
  EXAM_HISTORY: 'test_maza_exam_history_v2',
  ACTIVITY: 'test_maza_activity_v2',
  BOOKMARKS: 'test_maza_bookmarks_v2',
  SETTINGS: 'test_maza_settings_v2',
};

export const DEFAULT_SETTINGS = {
  autoAdvance: true,
  autoAdvanceDelay: 700,
  enableCustomCursor: true,
  enableSoundFx: false,
  proctorStrictness: 'High',
};

export const INITIAL_ACTIVITY = [
  {
    id: 'act-1',
    courseId: 'machine-learning-python',
    courseTitle: 'Machine Learning Using Python (CAP555)',
    phaseTitle: 'Phase 01 — Fundamentals',
    score: 46,
    total: 50,
    accuracy: 92,
    type: 'PRACTICE',
    timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
  },
  {
    id: 'act-2',
    courseId: 'php',
    courseTitle: 'PHP (CAP777)',
    phaseTitle: 'Phase 01 — Core Syntax & Arrays',
    score: 42,
    total: 50,
    accuracy: 84,
    type: 'EXAM',
    timestamp: Date.now() - 1000 * 60 * 60 * 22, // 22 hours ago
  },
  {
    id: 'act-3',
    courseId: 'analytical-skills-2',
    courseTitle: 'Analytical Skills-II (PEA516)',
    phaseTitle: 'Phase 01 — Quantitative Aptitude',
    score: 68,
    total: 80,
    accuracy: 85,
    type: 'PRACTICE',
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
  },
];

export const ROLES = {
  Student: {
    id: 'Student',
    name: 'STUDENT',
    title: 'Candidate Practice & Evaluation',
    blurb: 'High-focus practice mode with instant feedback, unit filters, and timed examination simulation.',
    badge: 'PRACTICE CANDIDATE',
    accent: '#159447',
  },
  Faculty: {
    id: 'Faculty',
    name: 'FACULTY',
    title: 'Curriculum & Coverage Oversight',
    blurb: 'Monitor unit coverage, difficulty breakdown, student readiness indexes, and concept difficulty.',
    badge: 'ACADEMIC FACULTY',
    accent: '#f58220',
  },
  Administrator: {
    id: 'Administrator',
    name: 'ADMINISTRATOR',
    title: 'System & Proctor Security Control',
    blurb: 'Oversee examination security events, session telemetry, proctor violation logs, and integrity controls.',
    badge: 'SYSTEM PROCTOR ADMIN',
    accent: '#ffd51f',
  },
};

export const GRADE_THRESHOLDS = [
  { min: 85, label: 'EXCELLENT', tag: 'OUTSTANDING COMMAND', tone: 'gold', note: 'You mastered this examination with elite academic accuracy.' },
  { min: 65, label: 'GOOD EFFORT', tag: 'SOLID FOUNDATION', tone: 'orange', note: 'Strong performance. Review the flagged mistakes to push beyond 90%.' },
  { min: 0, label: 'NEEDS PRACTICE', tag: 'REVIEW RECOMMENDED', tone: 'crimson', note: 'Reinforce foundational concepts in weaker units and retake the phase.' },
];
