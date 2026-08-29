import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  Code,
  Copy,
  Eye,
  Flame,
  HelpCircle,
  Lightbulb,
  Lock,
  Maximize2,
  Mic,
  Play,
  RotateCcw,
  Send,
  Shield,
  ShieldAlert,
  Sparkles,
  Terminal,
  Volume2,
  X,
} from 'lucide-react';
import { ARENA_LANGUAGE_TRACKS } from '../../data/arena/languages';
import { arenaQuestions } from '../../data/arena/arenaQuestions';
import { executeCode } from '../../services/codeExecutionService';
import { useAdvancedProctor } from '../../hooks/useAdvancedProctor';
import { LiveProctorWidget } from '../../components/exam/LiveProctorWidget';
import { ProctorWarningOverlay } from '../../components/exam/ProctorWarningOverlay';

export function ArenaWorkspacePage() {
  const { trackId = 'python', questionSlug = 'two-sum' } = useParams();
  const navigate = useNavigate();

  // Find track and question
  const activeTrack = useMemo(() => {
    return ARENA_LANGUAGE_TRACKS.find((t) => t.id === trackId) || ARENA_LANGUAGE_TRACKS[0];
  }, [trackId]);

  const trackQuestions = useMemo(() => {
    return arenaQuestions.filter((q) => q.trackId === activeTrack.id);
  }, [activeTrack]);

  const activeQuestion = useMemo(() => {
    return trackQuestions.find((q) => q.slug === questionSlug) || trackQuestions[0] || arenaQuestions[0];
  }, [trackQuestions, questionSlug]);

  // Editor State
  const [code, setCode] = useState(activeQuestion.starterCode);
  const [activeLeftTab, setActiveLeftTab] = useState('description'); // 'description' | 'hints' | 'editorial' | 'cheatsheet' | 'submissions'
  const [activeTestTab, setActiveTestTab] = useState(0); // Test case index

  // Execution States
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [submissionsHistory, setSubmissionsHistory] = useState([]);
  const [activeHintIndex, setActiveHintIndex] = useState(-1); // -1 = none unlocked
  const [isEditorialUnlocked, setIsEditorialUnlocked] = useState(false);

  // Mode: Practice vs Assessment
  const [isAssessmentMode, setIsAssessmentMode] = useState(false);
  const [proctorViolations, setProctorViolations] = useState([]);
  const [activeWarning, setActiveWarning] = useState(null);

  // Sync starter code when question changes
  useEffect(() => {
    setCode(activeQuestion.starterCode);
    setExecutionResult(null);
    setActiveTestTab(0);
    setActiveHintIndex(-1);
    setIsEditorialUnlocked(false);
  }, [activeQuestion]);

  // Record Violation in Assessment Mode
  const recordViolation = useCallback((reason) => {
    if (!isAssessmentMode) return;
    setProctorViolations((prev) => {
      const next = [{ reason, time: Date.now() }, ...prev];
      setActiveWarning({ reason, count: next.length });
      return next;
    });
  }, [isAssessmentMode]);

  // Hook for Proctored Assessment Mode
  const {
    cameraStream,
    audioLevel,
    hasCameraPermission,
    hasMicPermission,
  } = useAdvancedProctor({
    isActive: isAssessmentMode,
    onViolation: recordViolation,
    maxViolations: 3,
  });

  // Handle RUN (sample tests)
  const handleRunCode = async () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);
    setExecutionResult(null);

    const testSuite = activeQuestion.sampleTestCases || [];
    const result = await executeCode({
      languageTrack: activeTrack.id,
      code,
      testCases: testSuite,
      isSubmit: false,
    });

    setIsRunning(false);
    setExecutionResult(result);
  };

  // Handle SUBMIT (hidden test suite)
  const handleSubmitCode = async () => {
    if (isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setExecutionResult(null);

    const fullSuite = [
      ...(activeQuestion.sampleTestCases || []),
      ...(activeQuestion.hiddenTestCases || []),
    ];

    const result = await executeCode({
      languageTrack: activeTrack.id,
      code,
      testCases: fullSuite,
      isSubmit: true,
    });

    setIsSubmitting(false);
    setExecutionResult(result);

    // Record submission
    const submissionRecord = {
      id: Date.now(),
      verdict: result.verdict,
      runtimeMs: result.durationMs,
      memoryKb: result.memoryKb,
      passedCount: result.passedCount,
      totalCount: result.totalCount,
      timestamp: new Date().toLocaleTimeString(),
    };
    setSubmissionsHistory((prev) => [submissionRecord, ...prev]);

    if (result.verdict === 'ACCEPTED') {
      setIsEditorialUnlocked(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D64545', '#10B981', '#ffffff'],
      });

      // Save to solved storage
      try {
        const solved = JSON.parse(localStorage.getItem('arena_solved_problems') || '[]');
        if (!solved.includes(activeQuestion.id)) {
          localStorage.setItem('arena_solved_problems', JSON.stringify([...solved, activeQuestion.id]));
        }
      } catch (e) {}
    }
  };

  // Navigate to next unsolved
  const handleNextQuestion = () => {
    const currentIndex = trackQuestions.findIndex((q) => q.id === activeQuestion.id);
    const nextQuestion = trackQuestions[currentIndex + 1] || trackQuestions[0];
    if (nextQuestion) {
      navigate(`/arena/${activeTrack.id}/${nextQuestion.slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-main flex flex-col font-mono text-xs select-none">
      {/* Top IDE Toolbar */}
      <header className="h-14 border-b border-app bg-[#0E0E0E] px-4 flex items-center justify-between shrink-0 z-20">
        {/* Left: Brand & Question Switcher */}
        <div className="flex items-center space-x-3">
          <Link
            to="/arena"
            className="flex items-center space-x-2 text-muted hover:text-main px-2.5 py-1.5 rounded border border-app bg-surface transition-all"
            title="Return to Arena Catalog"
          >
            <ArrowLeft size={13} />
            <span className="text-[10px] tracking-mono-label uppercase hidden sm:inline">ARENA</span>
          </Link>

          {/* Question Selector Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center space-x-2 px-3 py-1.5 rounded border border-app bg-surface text-main font-medium hover:border-[#D64545] transition-all cursor-pointer"
              type="button"
            >
              <span className="text-[#D64545] font-semibold">
                {activeQuestion.id.toUpperCase()}:
              </span>
              <span className="truncate max-w-[180px] sm:max-w-[240px]">
                {activeQuestion.title}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-mono ${
                  activeQuestion.difficulty === 'Easy'
                    ? 'text-[#10B981] bg-[#10B981]/15'
                    : activeQuestion.difficulty === 'Medium'
                    ? 'text-[#EAB308] bg-[#EAB308]/15'
                    : 'text-[#D64545] bg-[#D64545]/15'
                }`}
              >
                {activeQuestion.difficulty}
              </span>
              <ChevronDown size={12} className="text-muted" />
            </button>

            {/* Dropdown list */}
            <div className="absolute left-0 top-full mt-1 w-72 max-h-80 overflow-y-auto rounded border border-app bg-[#121212] shadow-2xl p-2 hidden group-hover:block z-50">
              <div className="text-[9px] text-muted px-2 py-1 uppercase tracking-mono-label">
                {activeTrack.name} Challenges ({trackQuestions.length})
              </div>
              {trackQuestions.map((q) => (
                <Link
                  key={q.id}
                  to={`/arena/${activeTrack.id}/${q.slug}`}
                  className={`flex items-center justify-between p-2 rounded text-[11px] hover:bg-surface-raised transition-colors ${
                    q.id === activeQuestion.id ? 'bg-[#D64545]/10 text-[#D64545] font-medium' : 'text-secondary'
                  }`}
                >
                  <span className="truncate">{q.title}</span>
                  <span
                    className={`text-[9px] uppercase ${
                      q.difficulty === 'Easy'
                        ? 'text-[#10B981]'
                        : q.difficulty === 'Medium'
                        ? 'text-[#EAB308]'
                        : 'text-[#D64545]'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Language Switcher */}
        <div className="hidden md:flex items-center space-x-1.5 p-1 rounded border border-app bg-surface">
          {ARENA_LANGUAGE_TRACKS.map((track) => (
            <Link
              key={track.id}
              to={`/arena/${track.id}/${arenaQuestions.find(q => q.trackId === track.id)?.slug || 'two-sum'}`}
              className={`px-2.5 py-1 rounded text-[10px] tracking-mono-label uppercase transition-all ${
                track.id === activeTrack.id
                  ? 'bg-[#D64545] text-white font-medium'
                  : 'text-muted hover:text-main'
              }`}
            >
              {track.name}
            </Link>
          ))}
        </div>

        {/* Right: Mode Switcher & Run/Submit Actions */}
        <div className="flex items-center space-x-3">
          {/* Mode Switcher Badge */}
          <button
            onClick={() => setIsAssessmentMode(!isAssessmentMode)}
            className={`px-2.5 py-1.5 rounded border text-[10px] font-mono tracking-mono-label uppercase flex items-center space-x-1.5 transition-all cursor-pointer ${
              isAssessmentMode
                ? 'border-[#D64545] bg-[#D64545]/15 text-[#D64545] animate-pulse'
                : 'border-app bg-surface text-secondary hover:text-main'
            }`}
            type="button"
            title="Toggle Assessment / Practice Mode"
          >
            {isAssessmentMode ? <Shield size={12} /> : <BookOpen size={12} />}
            <span className="hidden sm:inline">
              {isAssessmentMode ? 'ASSESSMENT PROCTOR ON' : 'PRACTICE MODE'}
            </span>
          </button>

          {/* RUN Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="px-3.5 py-1.5 rounded border border-app bg-surface hover:border-[#D64545] text-main font-mono text-xs tracking-mono-label uppercase font-medium flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50"
            type="button"
          >
            <Play size={12} className="text-[#10B981]" />
            <span>{isRunning ? 'RUNNING...' : 'RUN'}</span>
          </button>

          {/* SUBMIT Button */}
          <button
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            className="px-4 py-1.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium flex items-center space-x-1.5 transition-all shadow-md hover:shadow-[#D64545]/20 cursor-pointer disabled:opacity-50"
            type="button"
          >
            <Send size={12} />
            <span>{isSubmitting ? 'JUDGING...' : 'SUBMIT'}</span>
          </button>
        </div>
      </header>

      {/* Main Split-Pane Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ============================================================ */}
        {/* LEFT PANE: Problem Statement, Hints, Editorial & Cheatsheet */}
        {/* ============================================================ */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-app bg-[#0E0E0E] overflow-hidden">
          {/* Left Navigation Tabs */}
          <div className="flex items-center space-x-1 border-b border-app px-4 py-2 bg-surface shrink-0 overflow-x-auto">
            {[
              { id: 'description', label: 'DESCRIPTION', icon: Code },
              { id: 'hints', label: 'HINTS', icon: Lightbulb },
              { id: 'editorial', label: 'EDITORIAL', icon: BookOpen },
              { id: 'submissions', label: 'SUBMISSIONS', icon: Terminal },
              { id: 'cheatsheet', label: 'CHEAT SHEET', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeLeftTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLeftTab(tab.id)}
                  className={`px-3 py-1.5 rounded text-[10px] tracking-mono-label uppercase flex items-center space-x-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-surface-raised text-main font-medium border border-app shadow-xs'
                      : 'text-muted hover:text-main'
                  }`}
                  type="button"
                >
                  <Icon size={12} className={isActive ? 'text-[#D64545]' : 'text-muted'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Left Pane Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 1. DESCRIPTION TAB */}
            {activeLeftTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-display font-medium text-main uppercase">
                    {activeQuestion.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono ${
                        activeQuestion.difficulty === 'Easy'
                          ? 'text-[#10B981] bg-[#10B981]/15'
                          : activeQuestion.difficulty === 'Medium'
                          ? 'text-[#EAB308] bg-[#EAB308]/15'
                          : 'text-[#D64545] bg-[#D64545]/15'
                      }`}
                    >
                      {activeQuestion.difficulty}
                    </span>
                    {activeQuestion.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-surface-raised border border-app text-[10px] text-secondary uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-[10px] text-muted ml-auto">
                      Limit: {activeQuestion.timeLimitMs}ms / {activeQuestion.memoryLimitMb}MB
                    </span>
                  </div>
                </div>

                {/* Formatted Markdown Problem Description */}
                <div className="prose prose-invert max-w-none text-secondary font-body leading-relaxed text-xs space-y-4">
                  <div className="whitespace-pre-line">{activeQuestion.description}</div>
                </div>
              </div>
            )}

            {/* 2. HINTS TAB */}
            {activeLeftTab === 'hints' && (
              <div className="space-y-4">
                <div className="space-y-1 hairline-b pb-3">
                  <h3 className="text-sm font-medium text-main uppercase">
                    PROGRESSIVE HINTS ({activeQuestion.hints.length})
                  </h3>
                  <p className="text-[11px] text-muted font-body">
                    Unlock progressive tips to guide your intuition without giving away the full solution.
                  </p>
                </div>

                <div className="space-y-3">
                  {activeQuestion.hints.map((hint, idx) => {
                    const isUnlocked = activeHintIndex >= idx;
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded border transition-all ${
                          isUnlocked
                            ? 'border-app bg-surface-raised text-secondary'
                            : 'border-app bg-surface opacity-75'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase font-medium">
                            HINT {idx + 1}
                          </span>
                          {!isUnlocked && (
                            <button
                              onClick={() => setActiveHintIndex(idx)}
                              className="px-2.5 py-1 rounded bg-[#D64545]/20 hover:bg-[#D64545] text-[#D64545] hover:text-white text-[10px] tracking-mono-label uppercase transition-all cursor-pointer"
                              type="button"
                            >
                              UNLOCK HINT
                            </button>
                          )}
                        </div>

                        {isUnlocked ? (
                          <p className="text-xs font-body leading-relaxed text-main">{hint}</p>
                        ) : (
                          <p className="text-[11px] text-muted italic">
                            Click 'Unlock Hint' to reveal this clue.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. EDITORIAL TAB */}
            {activeLeftTab === 'editorial' && (
              <div className="space-y-5">
                <div className="space-y-1 hairline-b pb-3">
                  <h3 className="text-sm font-medium text-main uppercase">
                    OFFICIAL EDITORIAL & COMPLEXITY ANALYSIS
                  </h3>
                  <span className="text-[10px] text-muted uppercase">
                    APPROACH: {activeQuestion.editorial.approach}
                  </span>
                </div>

                {!isEditorialUnlocked ? (
                  <div className="p-6 rounded border border-app bg-surface text-center space-y-4">
                    <Lock size={28} className="text-[#D64545] mx-auto" />
                    <div className="space-y-1">
                      <h4 className="text-sm text-main font-medium">EDITORIAL LOCKED</h4>
                      <p className="text-[11px] text-secondary font-body max-w-sm mx-auto">
                        Submit an Accepted solution or explicitly reveal the analysis to review the full solution code.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsEditorialUnlocked(true)}
                      className="px-4 py-2 rounded bg-surface-raised border border-app hover:border-[#D64545] text-main font-mono text-[10px] tracking-mono-label uppercase cursor-pointer"
                      type="button"
                    >
                      REVEAL EDITORIAL ANYWAY
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded border border-app bg-surface space-y-0.5">
                        <span className="text-[9px] text-muted uppercase">TIME COMPLEXITY</span>
                        <strong className="text-xs text-[#10B981] font-mono block">
                          {activeQuestion.editorial.complexityTime}
                        </strong>
                      </div>
                      <div className="p-3 rounded border border-app bg-surface space-y-0.5">
                        <span className="text-[9px] text-muted uppercase">SPACE COMPLEXITY</span>
                        <strong className="text-xs text-[#10B981] font-mono block">
                          {activeQuestion.editorial.complexitySpace}
                        </strong>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs font-body text-secondary leading-relaxed">
                      <p>{activeQuestion.editorial.explanation}</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-mono-label text-muted uppercase block">
                        REFERENCE SOLUTION
                      </span>
                      <pre className="p-4 rounded border border-app bg-black text-main font-mono text-xs overflow-x-auto">
                        <code>{activeQuestion.editorial.solutionCode}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. SUBMISSIONS TAB */}
            {activeLeftTab === 'submissions' && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-main uppercase hairline-b pb-3">
                  SUBMISSIONS HISTORY
                </h3>

                {submissionsHistory.length === 0 ? (
                  <div className="p-8 text-center border border-app rounded bg-surface text-muted text-xs">
                    No submissions recorded yet for this session. Click "Submit" to judge your solution.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {submissionsHistory.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3.5 rounded border border-app bg-surface flex justify-between items-center text-xs"
                      >
                        <div className="space-y-0.5">
                          <span
                            className={`font-semibold uppercase ${
                              sub.verdict === 'ACCEPTED' ? 'text-[#10B981]' : 'text-[#D64545]'
                            }`}
                          >
                            {sub.verdict}
                          </span>
                          <div className="text-[10px] text-muted">
                            Passed {sub.passedCount}/{sub.totalCount} tests • {sub.timestamp}
                          </div>
                        </div>
                        <div className="text-right text-[11px] text-secondary">
                          <span>{sub.runtimeMs}ms</span>
                          <span className="text-muted block text-[10px]">
                            {Math.round(sub.memoryKb / 1024)}MB
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. CHEAT SHEET TAB */}
            {activeLeftTab === 'cheatsheet' && (
              <div className="space-y-4">
                <div className="space-y-1 hairline-b pb-3">
                  <h3 className="text-sm font-medium text-main uppercase">
                    {activeTrack.name} CODE CHEATSHEET
                  </h3>
                  <p className="text-[11px] text-muted font-body">
                    Idiomatic patterns, standard library helpers, and syntax snippets for {activeTrack.name}.
                  </p>
                </div>

                <div className="space-y-3">
                  {activeTrack.cheatsheet.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded border border-app bg-surface space-y-2">
                      <span className="text-[10px] text-[#D64545] uppercase tracking-mono-label font-medium block">
                        {item.topic}
                      </span>
                      <pre className="p-2.5 rounded bg-black border border-app text-[11px] text-main font-mono overflow-x-auto">
                        <code>{item.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT PANE: Monaco Code Editor + Output Console */}
        {/* ============================================================ */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[#0A0A0A] overflow-hidden">
          {/* Editor Header Bar */}
          <div className="h-10 border-b border-app bg-surface px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2 text-[10px] text-muted uppercase tracking-mono-label">
              <Code size={13} className="text-[#D64545]" />
              <span>solution.{activeTrack.extension}</span>
            </div>

            <div className="flex items-center space-x-3 text-[10px]">
              <button
                onClick={() => setCode(activeQuestion.starterCode)}
                className="text-muted hover:text-main flex items-center space-x-1 transition-colors cursor-pointer"
                title="Reset code template"
                type="button"
              >
                <RotateCcw size={11} />
                <span>RESET</span>
              </button>
            </div>
          </div>

          {/* Monaco Code Editor */}
          <div className="flex-1 min-h-[300px] border-b border-app bg-[#0A0A0A] relative">
            <Editor
              height="100%"
              language={activeTrack.monacoLanguage}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              loading={
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#0A0A0A] text-muted space-y-2 font-mono text-xs">
                  <div className="w-6 h-6 rounded-full border-2 border-app border-t-[#D64545] animate-spin" />
                  <span className="text-[10px] tracking-mono-label text-[#D64545] uppercase">
                    INITIALIZING MONACO RUNTIME...
                  </span>
                </div>
              }
              options={{
                fontSize: 13,
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 12, bottom: 12 },
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                automaticLayout: true,
                tabSize: 4,
              }}
            />

            {/* Assessment Mode Proctored Overlay (if armed) */}
            {isAssessmentMode && (
              <div className="absolute top-3 right-3 z-30 w-52 pointer-events-auto">
                <LiveProctorWidget
                  cameraStream={cameraStream}
                  audioLevel={audioLevel}
                  hasCameraPermission={hasCameraPermission}
                  hasMicPermission={hasMicPermission}
                />
              </div>
            )}
          </div>

          {/* Output & Test Case Console Panel */}
          <div className="h-64 flex flex-col bg-[#0E0E0E] shrink-0 overflow-hidden">
            {/* Console Tabs */}
            <div className="h-9 border-b border-app bg-surface px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] tracking-mono-label text-muted uppercase font-medium">
                  EVALUATION SUITE:
                </span>
                {(activeQuestion.sampleTestCases || []).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestTab(idx)}
                    className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-mono transition-all cursor-pointer ${
                      activeTestTab === idx
                        ? 'bg-surface-raised border border-app text-main font-semibold'
                        : 'text-muted hover:text-main'
                    }`}
                    type="button"
                  >
                    Case {idx + 1}
                  </button>
                ))}
              </div>

              {executionResult && (
                <span
                  className={`text-[10px] font-mono uppercase font-semibold ${
                    executionResult.verdict === 'ACCEPTED'
                      ? 'text-[#10B981]'
                      : 'text-[#D64545]'
                  }`}
                >
                  {executionResult.verdict} ({executionResult.durationMs}ms)
                </span>
              )}
            </div>

            {/* Console Output Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
              {/* LeetCode-style Verdict Alert */}
              {executionResult ? (
                <div className="space-y-3">
                  <div
                    className={`p-3 rounded border flex items-center justify-between ${
                      executionResult.verdict === 'ACCEPTED'
                        ? 'border-[#10B981]/50 bg-[#10B981]/10 text-[#10B981]'
                        : 'border-[#D64545]/50 bg-[#D64545]/10 text-[#D64545]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {executionResult.verdict === 'ACCEPTED' ? (
                        <Check size={16} />
                      ) : (
                        <X size={16} />
                      )}
                      <span className="font-semibold text-sm tracking-wide uppercase">
                        {executionResult.verdict}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-[11px] text-secondary">
                      <span>Runtime: {executionResult.durationMs} ms</span>
                      <span>Memory: {Math.round(executionResult.memoryKb / 1024)} MB</span>
                      {executionResult.verdict === 'ACCEPTED' && (
                        <button
                          onClick={handleNextQuestion}
                          className="px-3 py-1 rounded bg-[#10B981] hover:bg-[#059669] text-white font-mono text-[10px] tracking-mono-label uppercase flex items-center space-x-1 transition-all cursor-pointer"
                          type="button"
                        >
                          <span>NEXT CHALLENGE</span>
                          <ArrowRight size={11} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Active Test Case Details */}
                  {executionResult.results && executionResult.results[activeTestTab] && (
                    <div className="space-y-2 text-[11px]">
                      <div className="space-y-1">
                        <span className="text-muted text-[10px] uppercase">INPUT:</span>
                        <div className="p-2 rounded bg-black border border-app text-secondary">
                          {executionResult.results[activeTestTab].input}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <span className="text-muted text-[10px] uppercase">EXPECTED:</span>
                          <div className="p-2 rounded bg-black border border-app text-[#10B981]">
                            {executionResult.results[activeTestTab].expected}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted text-[10px] uppercase">ACTUAL OUTPUT:</span>
                          <div
                            className={`p-2 rounded bg-black border border-app ${
                              executionResult.results[activeTestTab].passed
                                ? 'text-[#10B981]'
                                : 'text-[#D64545]'
                            }`}
                          >
                            {executionResult.results[activeTestTab].actual}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Default Test Case Inputs Preview */
                <div className="space-y-3 text-[11px]">
                  {activeQuestion.sampleTestCases && activeQuestion.sampleTestCases[activeTestTab] && (
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <span className="text-muted text-[10px] uppercase">INPUT:</span>
                        <div className="p-2 rounded bg-black border border-app text-secondary">
                          {activeQuestion.sampleTestCases[activeTestTab].input}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted text-[10px] uppercase">EXPECTED OUTPUT:</span>
                        <div className="p-2 rounded bg-black border border-app text-[#10B981]">
                          {activeQuestion.sampleTestCases[activeTestTab].expectedOutput}
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-[10px] text-muted italic">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-surface-raised border border-app text-secondary">Ctrl + Enter</kbd> to Run sample test cases, or <kbd className="px-1.5 py-0.5 rounded bg-surface-raised border border-app text-secondary">Ctrl + Shift + Enter</kbd> to Submit.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Proctor Security Overlay (Assessment Mode) */}
      <ProctorWarningOverlay
        isOpen={!!activeWarning}
        violationReason={activeWarning?.reason}
        violationCount={activeWarning?.count}
        onAcknowledge={() => setActiveWarning(null)}
      />
    </div>
  );
}
