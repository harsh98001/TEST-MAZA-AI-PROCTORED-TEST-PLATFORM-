import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PageTransition } from '../components/common/PageTransition';
import { PracticeHeader } from '../components/practice/PracticeHeader';
import { QuestionPanel } from '../components/practice/QuestionPanel';
import { PracticeSidebar } from '../components/practice/PracticeSidebar';
import { CompletionScreen } from '../components/review/CompletionScreen';
import { extractUnitStats } from '../utils/calculations';
import { formatDuration } from '../utils/formatters';
import { AUTO_ADVANCE_DELAY_MS } from '../utils/constants';

export function PracticePage() {
  const { courseId, phaseId } = useParams();
  const navigate = useNavigate();
  const { courses, savePhaseResult, settings, isFocusMode, setIsFocusMode } = useApp();

  const selectedCourse = courses.find((c) => c.id === courseId) || courses[0];
  const phases = selectedCourse.phases || [];
  const currentPhaseIndex = phases.findIndex((p) => p.id === phaseId);
  const activePhase = phases[currentPhaseIndex >= 0 ? currentPhaseIndex : 0] || null;

  // Active Questions for this phase or course
  const activeQuestions = useMemo(() => {
    return activePhase?.questions || selectedCourse.questions || [];
  }, [activePhase, selectedCourse]);

  // Unit filter state
  const [unitFilter, setUnitFilter] = useState('All Units');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Extract units for filter
  const units = useMemo(() => {
    return ['All Units', ...Array.from(new Set(activeQuestions.map((q) => q.unit).filter(Boolean)))];
  }, [activeQuestions]);

  // Filtered questions based on unit
  const filteredQuestions = useMemo(() => {
    if (unitFilter === 'All Units') return activeQuestions;
    return activeQuestions.filter((q) => q.unit === unitFilter);
  }, [activeQuestions, unitFilter]);

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer Tick
  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, isCompleted]);

  // Metrics
  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = activeQuestions.filter((q) => answers[q.id] === q.answer).length;
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // Choose Answer Handler with Auto-Advance
  const handleChooseAnswer = (label) => {
    if (!currentQuestion || answers[currentQuestion.id]) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: label,
    }));

    // Auto advance on correct answer if enabled
    if (label === currentQuestion.answer && settings.autoAdvance && currentIndex < filteredQuestions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, filteredQuestions.length - 1));
      }, settings.autoAdvanceDelay || AUTO_ADVANCE_DELAY_MS);
    }
  };

  const handleFinish = () => {
    const unitStats = extractUnitStats(activeQuestions, answers);
    const result = {
      isExam: false,
      answers,
      accuracy,
      correct: totalCorrect,
      answered: totalAnswered,
      total: activeQuestions.length,
      durationMs: elapsedTime,
      elapsedLabel: formatDuration(elapsedTime),
      phaseTitle: activePhase?.title || 'Practice Phase',
      unitStats,
    };

    savePhaseResult(selectedCourse.id, activePhase?.id || 'phase-1', result);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const hasNextPhase = activePhase && currentPhaseIndex < phases.length - 1;
  const handleNextPhase = () => {
    if (hasNextPhase) {
      const nextPhase = phases[currentPhaseIndex + 1];
      navigate(`/practice/${selectedCourse.id}/${nextPhase.id}`);
      setAnswers({});
      setCurrentIndex(0);
      setIsCompleted(false);
    }
  };

  const wrongQuestions = useMemo(() => {
    return activeQuestions
      .filter((q) => answers[q.id] && answers[q.id] !== q.answer)
      .map((q) => ({ ...q, userAnswer: answers[q.id] }));
  }, [activeQuestions, answers]);

  const unitStats = useMemo(() => {
    return extractUnitStats(activeQuestions, answers);
  }, [activeQuestions, answers]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-app text-main transition-colors duration-200">
        {/* Practice Header */}
        <PracticeHeader
          courseTitle={selectedCourse.title}
          phaseTitle={activePhase?.title || 'Full Syllabus'}
          elapsedTime={elapsedTime}
          unitFilter={unitFilter}
          units={units}
          onUnitChange={(u) => {
            setUnitFilter(u);
            setCurrentIndex(0);
          }}
          isFocusMode={isFocusMode}
          onToggleFocus={() => setIsFocusMode(!isFocusMode)}
          onReset={handleRestart}
        />

        {/* Practice Content / Completion Screen */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {isCompleted ? (
            <CompletionScreen
              courseTitle={selectedCourse.title}
              phaseTitle={activePhase?.title || 'Practice'}
              accuracy={accuracy}
              totalCorrect={totalCorrect}
              totalAnswered={totalAnswered}
              totalQuestions={activeQuestions.length}
              elapsedTimeFormatted={formatDuration(elapsedTime)}
              unitStats={unitStats}
              wrongQuestions={wrongQuestions}
              onRestart={handleRestart}
              onNextPhase={handleNextPhase}
              hasNextPhase={hasNextPhase}
            />
          ) : (
            <div className={`grid gap-8 items-start ${isFocusMode ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 lg:grid-cols-3'}`}>
              {/* Main Question Panel */}
              <div className={isFocusMode ? 'col-span-1' : 'lg:col-span-2'}>
                <QuestionPanel
                  question={currentQuestion}
                  currentIndex={currentIndex}
                  totalQuestions={filteredQuestions.length}
                  answers={answers}
                  onChooseAnswer={handleChooseAnswer}
                  onNext={() => setCurrentIndex((prev) => Math.min(prev + 1, filteredQuestions.length - 1))}
                  onPrevious={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                  onFinish={handleFinish}
                />
              </div>

              {/* Sidebar Navigator (Hidden in Focus Mode) */}
              {!isFocusMode && (
                <div className="lg:col-span-1">
                  <PracticeSidebar
                    questions={filteredQuestions}
                    currentIndex={currentIndex}
                    answers={answers}
                    onSelectIndex={(idx) => setCurrentIndex(idx)}
                    totalAnswered={totalAnswered}
                    totalCorrect={totalCorrect}
                    accuracy={accuracy}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
