import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
import { useAIProctoring } from '../hooks/useAIProctoring';
import {
  createExamSession,
  updateExamProgress,
  logProctoringViolation,
  completeExamSession,
  subscribeToStudentTermination,
} from '../services/examSessionService';

export function ExamPage() {
  const { courseId, phaseId } = useParams();
  const navigate = useNavigate();
  const { courses, savePhaseResult, addToast, user } = useApp();

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
  const [lockoutReason, setLockoutReason] = useState(null);
  const [lockoutMessage, setLockoutMessage] = useState(null);

  // Live DB Session State
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [videoElement, setVideoElement] = useState(null);

  // Proctor States
  const [fullscreenExitCount, setFullscreenExitCount] = useState(0);
  const [fullscreenAllowedExit, setFullscreenAllowedExit] = useState(false);
  const [proctorViolations, setProctorViolations] = useState([]);
  const [activeWarning, setActiveWarning] = useState(null);

  // Timer State: 60 seconds per question
  const totalDuration = useMemo(() => activeQuestions.length * 60 * 1000, [activeQuestions.length]);
  const [timeRemaining, setTimeRemaining] = useState(totalDuration);
  const [startTime, setStartTime] = useState(null);

  // 1. Record Standard Violation
  const recordViolation = useCallback(
    (reason, extraDetail = {}) => {
      if (fullscreenAllowedExit || isTerminated || isCompleted) return;

      setProctorViolations((prev) => {
        const isDuplicateRecent = prev[0]?.reason === reason && Date.now() - prev[0]?.time < 1200;
        if (isDuplicateRecent) return prev;

        const next = [{ reason, time: Date.now(), ...extraDetail }, ...prev];
        if (next.length >= PROCTOR_VIOLATION_LIMIT) {
          setIsTerminated(true);
          setLockoutReason('PROCTOR_VIOLATION_LIMIT');
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

      // Log into live DB
      if (activeSessionId) {
        logProctoringViolation({
          sessionId: activeSessionId,
          studentId: user?.id,
          eventType: extraDetail.type || 'SYSTEM_VIOLATION',
          severity: 'warning',
          detail: { reason, ...extraDetail },
          snapshotBase64: extraDetail.snapshot || null,
        });
      }
    },
    [activeSessionId, fullscreenAllowedExit, isCompleted, isTerminated, user?.id]
  );

  // 2. Hardware Proctor (Webcam, Mic decibels, Anti-clipboard)
  const {
    cameraStream,
    audioLevel,
    hasCameraPermission,
    hasMicPermission,
  } = useAdvancedProctor({
    isActive: hasStarted && !isCompleted && !isTerminated,
    onViolation: (reason) => recordViolation(reason, { type: 'HARDWARE_AUDIO_CLIPBOARD' }),
    maxViolations: PROCTOR_VIOLATION_LIMIT,
  });

  // 3. AI Vision Proctor (Zero face, Multiple faces, Mobile phone)
  const handleCriticalAIViolation = useCallback(
    ({ reason, message, snapshot }) => {
      if (isTerminated || isCompleted) return;

      setIsTerminated(true);
      setLockoutReason(reason);
      setLockoutMessage(message);
      setFullscreenAllowedExit(true);

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      setProctorViolations((prev) => [
        { reason: message || reason, time: Date.now(), snapshot },
        ...prev,
      ]);

      if (activeSessionId) {
        logProctoringViolation({
          sessionId: activeSessionId,
          studentId: user?.id,
          eventType: 'MULTIPLE_FACES',
          severity: 'critical',
          detail: { reason, message },
          snapshotBase64: snapshot,
        });
      }
    },
    [activeSessionId, isCompleted, isTerminated, user?.id]
  );

  const {
    riskScore,
    faceCount,
    aiStatus,
    captureSnapshot,
  } = useAIProctoring({
    videoElement,
    isActive: hasStarted && !isCompleted && !isTerminated && hasCameraPermission,
    onViolation: (reason, data) => recordViolation(reason, data),
    onCriticalViolation: handleCriticalAIViolation,
    audioLevel,
  });

  // 4. Realtime Subscription for Remote Faculty Termination
  useEffect(() => {
    if (!activeSessionId || !hasStarted || isCompleted || isTerminated) return;

    const unsubscribe = subscribeToStudentTermination(activeSessionId, (termEvent) => {
      setIsTerminated(true);
      setLockoutReason('FACULTY_TERMINATED');
      setLockoutMessage(termEvent.reason || 'Terminated remotely by supervising faculty proctor.');
      setFullscreenAllowedExit(true);

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      setProctorViolations((prev) => [
        {
          reason: termEvent.reason || 'Terminated by Faculty Proctor',
          time: Date.now(),
        },
        ...prev,
      ]);
    });

    return () => unsubscribe();
  }, [activeSessionId, hasStarted, isCompleted, isTerminated]);

  // 5. Fullscreen and Security Listeners
  useEffect(() => {
    if (!hasStarted || isCompleted || isTerminated || fullscreenAllowedExit) return;

    function handleFullscreenChange() {
      if (document.fullscreenElement || fullscreenAllowedExit) return;

      recordViolation('Fullscreen mode was exited', { type: 'FULLSCREEN_EXIT' });
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
        recordViolation('Exam window was hidden or browser tab was switched', { type: 'TAB_BLUR' });
      }
    }

    function handleBlur() {
      recordViolation('Test window lost active focus', { type: 'WINDOW_BLUR' });
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

  // 6. Countdown Timer
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

  // 7. Start Exam & Initialize Session
  const handleStartExam = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {
      console.warn('Fullscreen request bypassed:', e);
    }

    const newSession = await createExamSession({
      studentId: user?.id || 'guest_user',
      studentName: user?.name || 'Candidate',
      studentEmail: user?.email || '',
      trackId: selectedCourse.id,
      trackTitle: selectedCourse.title,
      phase: currentPhaseIndex >= 0 ? currentPhaseIndex + 1 : 1,
      totalQuestions: activeQuestions.length,
    });

    if (newSession?.id) {
      setActiveSessionId(newSession.id);
    }

    setStartTime(Date.now());
    setTimeRemaining(totalDuration);
    setHasStarted(true);
  };

  // 8. Choose Answer & Update Progress in DB
  const handleChooseAnswer = (label) => {
    const q = activeQuestions[currentIndex];
    if (!q || answers[q.id]) return;

    const updatedAnswers = {
      ...answers,
      [q.id]: label,
    };
    setAnswers(updatedAnswers);

    const answeredCount = Object.keys(updatedAnswers).length;
    const correctCount = activeQuestions.filter((item) => updatedAnswers[item.id] === item.answer).length;
    const progressPct = (answeredCount / activeQuestions.length) * 100;

    if (activeSessionId) {
      updateExamProgress({
        sessionId: activeSessionId,
        progressPct,
        answeredCount,
        correctCount,
        riskScore,
      });
    }
  };

  // 9. Finish Exam
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

    if (activeSessionId) {
      completeExamSession({
        sessionId: activeSessionId,
        answeredCount: totalAnswered,
        correctCount: totalCorrect,
        riskScore,
      });
    }

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
    setLockoutReason(null);
    setLockoutMessage(null);
    setIsCompleted(false);
    setFullscreenAllowedExit(false);
    setHasStarted(false);
    setActiveSessionId(null);
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
        lockoutReason={lockoutReason}
        lockoutMessage={lockoutMessage}
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
                {/* Live Webcam & Audio Decibel Widget with AI Vision Status */}
                <LiveProctorWidget
                  cameraStream={cameraStream}
                  audioLevel={audioLevel}
                  hasCameraPermission={hasCameraPermission}
                  hasMicPermission={hasMicPermission}
                  riskScore={riskScore}
                  aiStatus={aiStatus}
                  faceCount={faceCount}
                  onVideoElementReady={setVideoElement}
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
