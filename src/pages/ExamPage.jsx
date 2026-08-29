import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/common/PageTransition';
import { ExamHeader } from '../components/exam/ExamHeader';
import { ExamIntroModal } from '../components/exam/ExamIntroModal';
import { ProctorWarningOverlay } from '../components/exam/ProctorWarningOverlay';
import { ExamLockoutScreen } from '../components/exam/ExamLockoutScreen';
import { LiveProctorWidget } from '../components/exam/LiveProctorWidget';
import { QuestionPanel } from '../components/practice/QuestionPanel';
import { QuestionNavigator } from '../components/practice/QuestionNavigator';
import { CompletionScreen } from '../components/review/CompletionScreen';
import { extractUnitStats } from '../utils/calculations';
import { formatDuration } from '../utils/formatters';
import { FULLSCREEN_EXIT_LIMIT, PROCTOR_VIOLATION_LIMIT } from '../utils/constants';
import { useAdvancedProctor } from '../hooks/useAdvancedProctor';

export function ExamPage() {
  const { courseId, phaseId } = useParams();
  const navigate = useNavigate();
  const { courses, savePhaseResult, addToast } = useApp();

  const selectedCourse = courses.find((c) => c.id === courseId) || courses[0];
  const phases = selectedCourse.phases || [];
  const currentPhaseIndex = phases.findIndex((p) => p.id === phaseId);
  const activePhase = phases[currentPhaseIndex >= 0 ? currentPhaseIndex : 0] || null;

  const activeQuestions = useMemo(() => {
    return activePhase?.questions || selectedCourse.questions || [];
  }, [activePhase, selectedCourse]);

  // Exam States
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);

  // Proctor States
  const [fullscreenExitCount, setFullscreenExitCount] = useState(0);
  const [fullscreenAllowedExit, setFullscreenAllowedExit] = useState(false);
  const [proctorViolations, setProctorViolations] = useState([]);
  const [activeWarning, setActiveWarning] = useState(null);

  // Timer State: 60 seconds per question
  const totalDuration = useMemo(() => activeQuestions.length * 60 * 1000, [activeQuestions.length]);
  const [timeRemaining, setTimeRemaining] = useState(totalDuration);
  const [startTime, setStartTime] = useState(null);

  // Record Violation Function
  const recordViolation = useCallback((reason) => {
    if (fullscreenAllowedExit || isTerminated || isCompleted) return;

    setProctorViolations((prev) => {
      const isDuplicateRecent = prev[0]?.reason === reason && Date.now() - prev[0]?.time < 1200;
      if (isDuplicateRecent) return prev;

      const next = [{ reason, time: Date.now() }, ...prev];
      if (next.length >= PROCTOR_VIOLATION_LIMIT) {
        setIsTerminated(true);
        setFullscreenAllowedExit(true);
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      } else {
        setActiveWarning({
          reason,
          count: next.length,
        });
      }
      return next;
    });
  }, [fullscreenAllowedExit, isTerminated, isCompleted]);

  // Connect Advanced Proctor Hook (Webcam, Mic decibels, Anti-clipboard, Screen share)
  const {
    cameraStream,
    audioLevel,
    hasCameraPermission,
    hasMicPermission,
  } = useAdvancedProctor({
    isActive: hasStarted && !isCompleted && !isTerminated,
    onViolation: recordViolation,
    maxViolations: PROCTOR_VIOLATION_LIMIT,
  });

  // Fullscreen and Security Listeners
  useEffect(() => {
    if (!hasStarted || isCompleted || isTerminated || fullscreenAllowedExit) return;

    function handleFullscreenChange() {
      if (document.fullscreenElement || fullscreenAllowedExit) return;

      recordViolation('Fullscreen mode was exited');
      setFullscreenExitCount((count) => {
        const next = count + 1;
        if (next >= FULLSCREEN_EXIT_LIMIT) {
          setFullscreenAllowedExit(true);
        }
        return next;
      });
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        recordViolation('Exam window was hidden or browser tab was switched');
      }
    }

    function handleBlur() {
      recordViolation('Test window lost active focus');
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [hasStarted, isCompleted, isTerminated, fullscreenAllowedExit, recordViolation]);

  // Countdown Timer
  useEffect(() => {
    if (!hasStarted || isCompleted || isTerminated) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          handleFinishExam();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted, isCompleted, isTerminated]);

  const handleStartExam = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {
      console.warn('Fullscreen request bypassed:', e);
    }
    setStartTime(Date.now());
    setTimeRemaining(totalDuration);
    setHasStarted(true);
  };

  const handleChooseAnswer = (label) => {
    const q = activeQuestions[currentIndex];
    if (!q || answers[q.id]) return;

    setAnswers((prev) => ({
      ...prev,
      [q.id]: label,
    }));
  };

  const handleFinishExam = () => {
    const totalAnswered = Object.keys(answers).length;
    const totalCorrect = activeQuestions.filter((q) => answers[q.id] === q.answer).length;
    const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    const elapsedMs = totalDuration - timeRemaining;
    const unitStats = extractUnitStats(activeQuestions, answers);

    const result = {
      isExam: true,
      answers,
      accuracy,
      correct: totalCorrect,
      answered: totalAnswered,
      total: activeQuestions.length,
      durationMs: elapsedMs,
      elapsedLabel: formatDuration(elapsedMs),
      phaseTitle: activePhase?.title || 'Proctored Exam',
      unitStats,
    };

    savePhaseResult(selectedCourse.id, activePhase?.id || 'exam-1', result);
    setFullscreenAllowedExit(true);
    setIsCompleted(true);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setProctorViolations([]);
    setIsTerminated(false);
    setIsCompleted(false);
    setFullscreenAllowedExit(false);
    setHasStarted(false);
  };

  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = activeQuestions.filter((q) => answers[q.id] === q.answer).length;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const currentQuestion = activeQuestions[currentIndex] || activeQuestions[0];

  const wrongQuestions = useMemo(() => {
    return activeQuestions
      .filter((q) => answers[q.id] && answers[q.id] !== q.answer)
      .map((q) => ({ ...q, userAnswer: answers[q.id] }));
  }, [activeQuestions, answers]);

  const unitStats = useMemo(() => {
    return extractUnitStats(activeQuestions, answers);
  }, [activeQuestions, answers]);

  if (!hasStarted) {
    return (
      <ExamIntroModal
        courseTitle={selectedCourse.title}
        phaseTitle={activePhase?.title || 'Full Syllabus'}
        questionCount={activeQuestions.length}
        onStartExam={handleStartExam}
      />
    );
  }

  if (isTerminated) {
    return (
      <ExamLockoutScreen
        violations={proctorViolations}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-app text-main exam-protection transition-colors duration-200">
        {/* Security Warning Overlay */}
        <ProctorWarningOverlay
          isOpen={Boolean(activeWarning)}
          violationReason={activeWarning?.reason}
          violationCount={activeWarning?.count}
          onAcknowledge={() => setActiveWarning(null)}
        />

        {/* Exam Header */}
        <ExamHeader
          courseTitle={selectedCourse.title}
          phaseTitle={activePhase?.title || 'Exam Phase'}
          timeRemaining={timeRemaining}
          proctorViolations={proctorViolations}
          audioLevel={audioLevel}
          hasCamera={hasCameraPermission}
          onFinish={handleFinishExam}
        />

        {/* Exam Main Area */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {isCompleted ? (
            <CompletionScreen
              courseTitle={selectedCourse.title}
              phaseTitle={activePhase?.title || 'Proctored Exam'}
              accuracy={accuracy}
              totalCorrect={totalCorrect}
              totalAnswered={totalAnswered}
              totalQuestions={activeQuestions.length}
              elapsedTimeFormatted={formatDuration(totalDuration - timeRemaining)}
              unitStats={unitStats}
              wrongQuestions={wrongQuestions}
              onRestart={handleRestart}
              onNextPhase={() => navigate('/courses')}
              hasNextPhase={false}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Question Panel */}
              <div className="lg:col-span-2">
                <QuestionPanel
                  question={currentQuestion}
                  currentIndex={currentIndex}
                  totalQuestions={activeQuestions.length}
                  answers={answers}
                  onChooseAnswer={handleChooseAnswer}
                  onNext={() => setCurrentIndex((prev) => Math.min(prev + 1, activeQuestions.length - 1))}
                  onPrevious={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                  onFinish={handleFinishExam}
                />
              </div>

              {/* Sidebar with Live Proctor Video Feed & Navigator */}
              <div className="lg:col-span-1 space-y-6">
                {/* Live Webcam & Audio Decibel Widget */}
                <LiveProctorWidget
                  cameraStream={cameraStream}
                  audioLevel={audioLevel}
                  hasCameraPermission={hasCameraPermission}
                  hasMicPermission={hasMicPermission}
                />

                {/* Navigator Matrix */}
                <div className="p-5 rounded-2xl border border-app bg-surface shadow-xs">
                  <QuestionNavigator
                    questions={activeQuestions}
                    currentIndex={currentIndex}
                    answers={answers}
                    onSelectIndex={(idx) => setCurrentIndex(idx)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
