import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Ban,
  CheckCircle,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Filter,
  Flame,
  GraduationCap,
  Heart,
  Layers,
  MessageSquare,
  Monitor,
  Radio,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  User,
  UserX,
  Users,
  Video,
  VideoOff,
  Volume2,
  X,
} from 'lucide-react';
import { PageTransition } from '../../components/common/PageTransition';
import {
  getActiveExamSessions,
  getSessionViolationEvents,
  terminateExamSession,
  subscribeToActiveSessions,
  sendTeacherMotivation,
  getExamReports,
  subscribeToExamReports,
} from '../../services/examSessionService';
import { useApp } from '../../context/AppContext';

export function LiveExamMonitorPage() {
  const { addToast, user } = useApp();

  // Tab State: 'live_sessions' | 'student_reports'
  const [activeTab, setActiveTab] = useState('live_sessions');

  // Live Sessions State
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrackFilter, setSelectedTrackFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('risk_desc'); // 'risk_desc' | 'recent' | 'progress'

  // Exam Reports & Unfair Means Audit State
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [reportsFilter, setReportsFilter] = useState('all'); // 'all' | 'flagged'
  const [reportsSearch, setReportsSearch] = useState('');
  const [selectedReportModal, setSelectedReportModal] = useState(null);

  // Modals for Live Sessions
  const [evidenceSession, setEvidenceSession] = useState(null);
  const [evidenceLogs, setEvidenceLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const [terminateTarget, setTerminateTarget] = useState(null);
  const [terminationReason, setTerminationReason] = useState('Unauthorized communication detected by proctor');
  const [terminating, setTerminating] = useState(false);

  // Motivation Modal State
  const [motivateTarget, setMotivateTarget] = useState(null);
  const [motivationMessage, setMotivationMessage] = useState("Keep your pace steady, you're doing great!");
  const [sendingMotivation, setSendingMotivation] = useState(false);

  // Screen View Modal State
  const [viewScreenSession, setViewScreenSession] = useState(null);

  // 1. Initial Fetch of Live Sessions
  const loadSessions = async () => {
    setLoading(true);
    try {
      const data = await getActiveExamSessions();
      setSessions(data || []);
    } catch (e) {
      console.warn('Load sessions failed:', e);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Stored Student Exam Reports
  const loadReports = async () => {
    setLoadingReports(true);
    try {
      const data = await getExamReports();
      setReports(data || []);
    } catch (e) {
      console.warn('Load reports failed:', e);
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    loadSessions();
    loadReports();

    // Realtime Subscriptions
    const unsubscribeSessions = subscribeToActiveSessions((payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        setSessions((prev) => [payload.new, ...prev.filter((s) => s.id !== payload.new.id)]);
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        setSessions((prev) => prev.map((s) => (s.id === payload.new.id ? payload.new : s)));
      } else if (payload.eventType === 'POLL' && payload.sessions) {
        setSessions(payload.sessions);
      }
    });

    const unsubscribeReports = subscribeToExamReports((newReport) => {
      setReports((prev) => [newReport, ...prev.filter((r) => r.id !== newReport.id)]);
      addToast('info', 'NEW EXAM REPORT', `Submission received from ${newReport.student_name}.`);
    });

    return () => {
      unsubscribeSessions();
      unsubscribeReports();
    };
  }, []);

  // 3. Open Evidence Drawer
  const handleOpenEvidence = async (sess) => {
    setEvidenceSession(sess);
    setLoadingLogs(true);
    try {
      const logs = await getSessionViolationEvents(sess.id);
      setEvidenceLogs(logs || []);
    } catch (err) {
      setEvidenceLogs([]);
    } finally {
      setLoadingLogs(false);
    }
  };

  // 4. Handle Faculty Terminate
  const handleConfirmTerminate = async () => {
    if (!terminateTarget) return;

    setTerminating(true);
    try {
      await terminateExamSession({
        sessionId: terminateTarget.id,
        facultyId: user?.id || user?.email || 'faculty_supervisor',
        reason: terminationReason,
      });

      // Optimistic update
      setSessions((prev) =>
        prev.map((s) =>
          s.id === terminateTarget.id
            ? { ...s, status: 'terminated', termination_reason: terminationReason }
            : s
        )
      );

      addToast(
        'info',
        'CANDIDATE DISQUALIFIED',
        `Session for ${terminateTarget.student_name || 'Candidate'} has been terminated.`
      );
      setTerminateTarget(null);
    } catch (err) {
      addToast('error', 'TERMINATION FAILED', err.message || 'Could not terminate session.');
    } finally {
      setTerminating(false);
    }
  };

  // 5. Handle Faculty Motivation Dispatch
  const handleSendMotivation = async () => {
    if (!motivateTarget || !motivationMessage.trim()) return;

    setSendingMotivation(true);
    try {
      await sendTeacherMotivation({
        sessionId: motivateTarget.id,
        teacherId: user?.id || user?.email || 'faculty_supervisor',
        teacherName: user?.name || 'Prof. Sharma (Faculty)',
        message: motivationMessage.trim(),
      });

      addToast(
        'success',
        'MOTIVATION BROADCASTED',
        `Message delivered to ${motivateTarget.student_name}'s live exam display.`
      );
      setMotivateTarget(null);
    } catch (err) {
      addToast('error', 'BROADCAST FAILED', err.message || 'Could not send motivation.');
    } finally {
      setSendingMotivation(false);
    }
  };

  // 6. Filter & Sort Live Sessions
  const filteredSessions = useMemo(() => {
    return sessions
      .filter((s) => {
        if (selectedTrackFilter !== 'ALL' && s.track_id !== selectedTrackFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = s.student_name?.toLowerCase().includes(q);
          const matchEmail = s.student_email?.toLowerCase().includes(q);
          const matchTrack = s.track_title?.toLowerCase().includes(q);
          if (!matchName && !matchEmail && !matchTrack) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'risk_desc') {
          return (b.risk_score || 0) - (a.risk_score || 0);
        }
        if (sortBy === 'progress') {
          return (b.progress_pct || 0) - (a.progress_pct || 0);
        }
        return new Date(b.started_at) - new Date(a.started_at);
      });
  }, [sessions, selectedTrackFilter, searchQuery, sortBy]);

  // 7. Filter Stored Reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (reportsFilter === 'flagged' && !r.is_flagged_for_cheating) return false;
      if (reportsSearch) {
        const q = reportsSearch.toLowerCase();
        const matchName = r.student_name?.toLowerCase().includes(q);
        const matchEmail = r.student_email?.toLowerCase().includes(q);
        const matchTrack = r.track_title?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchTrack) return false;
      }
      return true;
    });
  }, [reports, reportsFilter, reportsSearch]);

  const activeCount = sessions.filter((s) => s.status === 'in_progress').length;
  const highRiskCount = sessions.filter((s) => s.status === 'in_progress' && (s.risk_score || 0) > 60).length;
  const terminatedCount = sessions.filter((s) => s.status === 'terminated').length;
  const flaggedReportsCount = reports.filter((r) => r.is_flagged_for_cheating).length;

  const presetMessages = [
    "Keep your pace steady, you're doing great!",
    'Take your time to review the remaining questions.',
    'Excellent focus! Stay in the zone.',
    'Reminder: Keep your eyes on the screen and stay calm.',
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24 space-y-8 font-mono text-xs">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 hairline-b pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] tracking-mono-label text-[#D64545] uppercase">
              <Radio size={13} className="text-[#D64545] animate-pulse" />
              <span>FACULTY COMMAND // LIVE EXAMINATION SUPERVISOR</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-medium text-main uppercase">
              FACULTY OVERSIGHT ROOM.
            </h1>
            <p className="text-xs text-secondary font-body max-w-xl leading-relaxed">
              Surveil live student exam streams, inspect shared screens, broadcast motivation or disqualify candidates, and audit permanent cheating violation records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] tracking-mono-label uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>REALTIME SYNC ACTIVE</span>
            </div>
            <button
              onClick={() => {
                loadSessions();
                loadReports();
              }}
              className="p-2 rounded bg-surface-raised border border-app hover:border-[#D64545] text-muted hover:text-white transition-colors cursor-pointer"
              title="Refresh Telemetry"
              type="button"
            >
              <RefreshCw size={13} className={loading || loadingReports ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Global Live Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-lg border border-app bg-surface space-y-1">
            <span className="text-[10px] text-muted uppercase">ACTIVE EXAMINEES</span>
            <div className="text-3xl font-display font-medium text-main">{activeCount}</div>
            <span className="text-[10px] text-[#10B981] block">// SESSIONS IN PROGRESS</span>
          </div>

          <div className="p-5 rounded-lg border border-app bg-surface space-y-1">
            <span className="text-[10px] text-muted uppercase">ELEVATED RISK FLAG</span>
            <div className="text-3xl font-display font-medium text-[#D64545]">{highRiskCount}</div>
            <span className="text-[10px] text-[#D64545] block">// RISK SCORE &gt; 60/100</span>
          </div>

          <div className="p-5 rounded-lg border border-app bg-surface space-y-1">
            <span className="text-[10px] text-muted uppercase">DISQUALIFIED SESSIONS</span>
            <div className="text-3xl font-display font-medium text-muted">{terminatedCount}</div>
            <span className="text-[10px] text-muted block">// SECURITY BREACH LOCKOUTS</span>
          </div>

          <div className="p-5 rounded-lg border border-app bg-surface space-y-1">
            <span className="text-[10px] text-muted uppercase">UNFAIR MEANS DETECTED</span>
            <div className="text-3xl font-display font-medium text-[#EAB308]">{flaggedReportsCount}</div>
            <span className="text-[10px] text-[#EAB308] block">// PERMANENT REPORTS AUDIT</span>
          </div>
        </div>

        {/* Primary View Tab Switcher */}
        <div className="flex border-b border-app">
          <button
            onClick={() => setActiveTab('live_sessions')}
            className={`py-3 px-6 text-xs font-mono tracking-mono-label uppercase font-medium flex items-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'live_sessions'
                ? 'border-[#D64545] text-main bg-surface-raised/40'
                : 'border-transparent text-secondary hover:text-main'
            }`}
            type="button"
          >
            <Radio size={14} className={activeTab === 'live_sessions' ? 'text-[#D64545] animate-pulse' : ''} />
            <span>01 / LIVE SURVEILLANCE &amp; SCREEN SHARING ({sessions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('student_reports')}
            className={`py-3 px-6 text-xs font-mono tracking-mono-label uppercase font-medium flex items-center space-x-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'student_reports'
                ? 'border-[#D64545] text-main bg-surface-raised/40'
                : 'border-transparent text-secondary hover:text-main'
            }`}
            type="button"
          >
            <FileText size={14} className={activeTab === 'student_reports' ? 'text-[#D64545]' : ''} />
            <span>02 / STUDENT TEST REPORTS &amp; UNFAIR MEANS AUDIT ({reports.length})</span>
          </button>
        </div>

        {/* TAB 1: LIVE SURVEILLANCE & SCREEN SHARING */}
        {activeTab === 'live_sessions' && (
          <div className="space-y-6">
            {/* Filters & Search Toolbar */}
            <div className="p-4 rounded-lg border border-app bg-surface flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3.5 top-3 text-muted" />
                <input
                  type="text"
                  placeholder="Search active candidate by name, email, or track..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#161616] border border-app rounded pl-10 pr-4 py-2 text-xs text-main placeholder:text-muted/50 focus:border-[#D64545] outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-muted uppercase">SORT:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#161616] border border-app rounded px-2.5 py-1.5 text-xs text-main outline-none focus:border-[#D64545] cursor-pointer"
                  >
                    <option value="risk_desc">Highest Risk First</option>
                    <option value="recent">Recently Started</option>
                    <option value="progress">Highest Progress</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Candidate Session Grid */}
            {filteredSessions.length === 0 ? (
              <div className="py-20 text-center border border-app rounded-lg bg-surface text-muted space-y-2">
                <Users size={28} className="mx-auto text-muted/50" />
                <p className="text-xs uppercase tracking-mono-label">NO ACTIVE CANDIDATE SESSIONS RECORDED</p>
                <span className="text-[10px] text-secondary">
                  When students launch a proctored exam, their live telemetry, screen feed, and risk score stream here in real time.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSessions.map((sess) => {
                  const risk = sess.risk_score || 0;
                  const isTerminated = sess.status === 'terminated';
                  const isCompleted = sess.status === 'completed';
                  const isScreenSharing = sess.screen_share_active;

                  const riskBadgeClass =
                    risk > 70
                      ? 'bg-[#D64545]/20 text-[#D64545] border-[#D64545]/50 animate-pulse'
                      : risk > 30
                      ? 'bg-[#EAB308]/20 text-[#EAB308] border-[#EAB308]/50'
                      : 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30';

                  return (
                    <div
                      key={sess.id}
                      className={`p-5 rounded-lg border bg-surface transition-all flex flex-col justify-between space-y-5 ${
                        isTerminated
                          ? 'border-[#D64545]/30 opacity-75'
                          : risk > 70
                          ? 'border-[#D64545] shadow-[0_0_30px_rgba(214,69,69,0.2)]'
                          : 'border-app hover:border-app-raised'
                      }`}
                    >
                      <div className="space-y-4">
                        {/* Top Identity & Status */}
                        <div className="flex justify-between items-start gap-2 hairline-b pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded bg-[#D64545]/10 border border-[#D64545]/30 text-[#D64545] flex items-center justify-center font-bold text-xs uppercase">
                              {sess.student_name?.charAt(0) || 'C'}
                            </div>
                            <div>
                              <span className="text-main font-medium text-xs block truncate max-w-[150px]">
                                {sess.student_name || 'Candidate'}
                              </span>
                              <span className="text-[10px] text-muted truncate block max-w-[150px]">
                                {sess.student_email || 'student@academic.edu'}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1">
                            <div className={`px-2 py-0.5 rounded border text-[9px] uppercase tracking-mono-label font-medium ${riskBadgeClass}`}>
                              RISK: {risk}/100
                            </div>
                            {isScreenSharing && (
                              <button
                                onClick={() => setViewScreenSession(sess)}
                                className="px-2 py-0.5 rounded bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-[9px] tracking-mono-label uppercase font-medium flex items-center gap-1 cursor-pointer hover:bg-[#10B981]/30"
                                type="button"
                              >
                                <Monitor size={9} />
                                <span>VIEW SCREEN</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Course Track Meta */}
                        <div className="space-y-1">
                          <span className="text-[9px] text-[#D64545] uppercase tracking-mono-label font-medium block">
                            EXAM TRACK // PHASE {sess.phase || 1}
                          </span>
                          <h4 className="text-sm font-display font-medium text-main truncate">
                            {sess.track_title || sess.track_id}
                          </h4>
                        </div>

                        {/* Live Progress Bar */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] text-secondary">
                            <span>PROGRESS</span>
                            <span className="text-main font-medium">
                              {Math.round(sess.progress_pct || 0)}% ({sess.answered_count || 0}/{sess.total_questions || 50} Qs)
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-surface-raised rounded-full overflow-hidden border border-app">
                            <div
                              className="h-full bg-[#10B981] transition-all duration-300"
                              style={{ width: `${Math.max(4, sess.progress_pct || 0)}%` }}
                            />
                          </div>
                        </div>

                        {/* Latest Motivation / Action Note */}
                        {sess.latest_teacher_motivation && (
                          <div className="p-2 rounded bg-[#10B981]/10 border border-[#10B981]/20 text-[10px] text-[#10B981] flex items-center gap-1.5">
                            <Sparkles size={11} className="shrink-0" />
                            <span className="truncate">Teacher: "{sess.latest_teacher_motivation}"</span>
                          </div>
                        )}

                        {/* Status Indicator */}
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-muted">STATUS:</span>
                          {isTerminated ? (
                            <span className="text-[#D64545] font-semibold flex items-center gap-1">
                              <Ban size={11} /> DISQUALIFIED
                            </span>
                          ) : isCompleted ? (
                            <span className="text-[#10B981] font-semibold flex items-center gap-1">
                              <CheckCircle size={11} /> COMPLETED
                            </span>
                          ) : (
                            <span className="text-[#10B981] font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                              IN PROGRESS
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions Row */}
                      <div className="space-y-2 pt-3 border-t border-app">
                        <div className="flex items-center gap-2">
                          {/* Evidence Log Button */}
                          <button
                            onClick={() => handleOpenEvidence(sess)}
                            className="flex-1 py-2 px-2.5 rounded bg-surface-raised border border-app hover:border-[#D64545] text-main text-[10px] tracking-mono-label uppercase font-medium flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                            type="button"
                          >
                            <Eye size={11} />
                            <span>EVIDENCE</span>
                          </button>

                          {/* Motivate Button */}
                          {!isTerminated && !isCompleted && (
                            <button
                              onClick={() => {
                                setMotivateTarget(sess);
                                setMotivationMessage("Keep your pace steady, you're doing great!");
                              }}
                              className="py-2 px-2.5 rounded bg-[#10B981]/15 border border-[#10B981]/40 hover:bg-[#10B981] text-[#10B981] hover:text-white text-[10px] tracking-mono-label uppercase font-medium flex items-center justify-center space-x-1 transition-all cursor-pointer"
                              type="button"
                              title="Send real-time motivation to candidate"
                            >
                              <Sparkles size={11} />
                              <span>MOTIVATE</span>
                            </button>
                          )}

                          {/* Terminate Button */}
                          {!isTerminated && !isCompleted && (
                            <button
                              onClick={() => {
                                setTerminateTarget(sess);
                                setTerminationReason('Unauthorized communication detected by proctor');
                              }}
                              className="py-2 px-2.5 rounded bg-[#D64545]/15 border border-[#D64545]/40 hover:bg-[#D64545] text-[#D64545] hover:text-white text-[10px] tracking-mono-label uppercase font-medium flex items-center justify-center space-x-1 transition-all cursor-pointer"
                              type="button"
                              title="Disqualify candidate"
                            >
                              <AlertOctagon size={11} />
                              <span>TERMINATE</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: STUDENT TEST REPORTS & UNFAIR MEANS AUDIT */}
        {activeTab === 'student_reports' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="p-4 rounded-lg border border-app bg-surface flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3.5 top-3 text-muted" />
                <input
                  type="text"
                  placeholder="Search exam reports by student name, email, or track..."
                  value={reportsSearch}
                  onChange={(e) => setReportsSearch(e.target.value)}
                  className="w-full bg-[#161616] border border-app rounded pl-10 pr-4 py-2 text-xs text-main placeholder:text-muted/50 focus:border-[#D64545] outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReportsFilter('all')}
                  className={`px-3 py-1.5 rounded border text-[10px] tracking-mono-label uppercase font-medium transition-all cursor-pointer ${
                    reportsFilter === 'all'
                      ? 'bg-main text-black border-main font-bold'
                      : 'bg-surface-raised border-app text-muted hover:text-main'
                  }`}
                  type="button"
                >
                  ALL CANDIDATES ({reports.length})
                </button>
                <button
                  onClick={() => setReportsFilter('flagged')}
                  className={`px-3 py-1.5 rounded border text-[10px] tracking-mono-label uppercase font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    reportsFilter === 'flagged'
                      ? 'bg-[#D64545] text-white border-[#D64545] font-bold'
                      : 'bg-[#D64545]/15 border-[#D64545]/40 text-[#D64545] hover:bg-[#D64545]/25'
                  }`}
                  type="button"
                >
                  <ShieldAlert size={12} />
                  <span>UNFAIR MEANS ONLY ({flaggedReportsCount})</span>
                </button>
              </div>
            </div>

            {/* Reports List / Table */}
            {filteredReports.length === 0 ? (
              <div className="py-20 text-center border border-app rounded-lg bg-surface text-muted space-y-2">
                <FileText size={28} className="mx-auto text-muted/50" />
                <p className="text-xs uppercase tracking-mono-label">NO EXAM REPORTS MATCH CURRENT FILTER</p>
                <span className="text-[10px] text-secondary">
                  When students complete exams, full reports and anti-cheating audit evidence are stored on Supabase and displayed here.
                </span>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReports.map((rep) => {
                  const isFlagged = rep.is_flagged_for_cheating;
                  const dateStr = new Date(rep.created_at).toLocaleString();

                  return (
                    <div
                      key={rep.id}
                      className={`p-5 rounded-lg border bg-surface flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all ${
                        isFlagged
                          ? 'border-[#D64545]/40 hover:border-[#D64545] bg-[#D64545]/5'
                          : 'border-app hover:border-app-raised'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-main font-medium text-sm">
                            {rep.student_name || 'Candidate'}
                          </span>
                          <span className="text-[10px] text-muted font-normal">
                            ({rep.student_email || 'student@academic.edu'})
                          </span>
                          {isFlagged ? (
                            <span className="px-2 py-0.5 rounded bg-[#D64545]/20 text-[#D64545] border border-[#D64545]/40 text-[9px] uppercase tracking-mono-label font-bold flex items-center gap-1">
                              <AlertTriangle size={10} /> UNFAIR MEANS DETECTED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[9px] uppercase tracking-mono-label font-bold flex items-center gap-1">
                              <CheckCircle2 size={10} /> CLEAN INTEGRITY
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-secondary">
                          <span className="text-[#D64545] font-medium">{rep.track_title || rep.track_id}</span>
                          <span>Phase {rep.phase || 1}</span>
                          <span>Score: {rep.score}/{rep.total_questions} ({rep.accuracy || 0}%)</span>
                          <span>Time: {rep.elapsed_label || `${Math.round(rep.duration_ms / 1000)}s`}</span>
                          <span className="text-muted">{dateStr}</span>
                        </div>

                        {/* Cheating Reasons Badges */}
                        {isFlagged && rep.flag_reasons?.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[9px] text-muted uppercase">INFRACTIONS:</span>
                            {rep.flag_reasons.map((flag, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded bg-black/60 border border-[#D64545]/30 text-[#D64545] text-[9px] uppercase tracking-mono-label"
                              >
                                {flag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Audit CTA */}
                      <button
                        onClick={() => setSelectedReportModal(rep)}
                        className="py-2 px-4 rounded bg-surface-raised border border-app hover:border-[#D64545] text-main text-xs uppercase tracking-mono-label font-medium flex items-center space-x-2 transition-all cursor-pointer shrink-0"
                        type="button"
                      >
                        <Eye size={12} />
                        <span>AUDIT REPORT &amp; EVIDENCE</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* MOTIVATION MODAL */}
        <AnimatePresence>
          {motivateTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMotivateTarget(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-[#0D0D0D] border border-[#10B981]/50 rounded-xl shadow-2xl z-10 p-6 space-y-5 text-main font-mono"
              >
                <div className="flex items-center space-x-3 text-[#10B981]">
                  <div className="w-10 h-10 rounded bg-[#10B981]/15 border border-[#10B981]/40 flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-mono-label font-medium block">
                      LIVE TEACHER INTERVENTION
                    </span>
                    <h3 className="text-base font-display font-medium uppercase text-white">
                      MOTIVATE CANDIDATE
                    </h3>
                  </div>
                </div>

                <p className="text-secondary text-xs leading-relaxed font-sans">
                  Send real-time encouraging encouragement or guidance to{' '}
                  <strong>{motivateTarget.student_name}</strong>. A prominent message banner will appear on their exam HUD.
                </p>

                {/* Preset Suggestions */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-muted uppercase tracking-mono-label block">
                    QUICK PRESETS:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {presetMessages.map((msg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMotivationMessage(msg)}
                        type="button"
                        className="p-2 rounded bg-surface-raised border border-app hover:border-[#10B981] text-secondary hover:text-white text-left text-xs transition-colors cursor-pointer"
                      >
                        "{msg}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Message Input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-muted uppercase tracking-mono-label block">
                    CUSTOM MESSAGE:
                  </label>
                  <textarea
                    rows={2}
                    value={motivationMessage}
                    onChange={(e) => setMotivationMessage(e.target.value)}
                    className="w-full bg-[#161616] border border-app rounded p-2.5 text-xs text-white focus:border-[#10B981] outline-none resize-none"
                    placeholder="Enter teacher instruction or encouraging message..."
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setMotivateTarget(null)}
                    className="flex-1 py-2.5 rounded bg-surface-raised border border-app text-muted hover:text-white text-xs uppercase tracking-mono-label cursor-pointer"
                    type="button"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleSendMotivation}
                    disabled={sendingMotivation || !motivationMessage.trim()}
                    className="flex-1 py-2.5 rounded bg-[#10B981] hover:bg-[#14C98E] text-black text-xs uppercase tracking-mono-label font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    type="button"
                  >
                    {sendingMotivation ? (
                      <RefreshCw size={13} className="animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={13} />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* SCREEN VIEW MODAL */}
        <AnimatePresence>
          {viewScreenSession && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setViewScreenSession(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-4xl bg-[#0D0D0D] border border-app rounded-xl shadow-2xl z-10 p-6 space-y-4 text-main font-mono"
              >
                <div className="flex justify-between items-center border-b border-app pb-3">
                  <div className="flex items-center space-x-2 text-[#10B981]">
                    <Monitor size={16} />
                    <span className="text-xs uppercase tracking-mono-label font-bold">
                      LIVE SCREEN SURVEILLANCE // {viewScreenSession.student_name}
                    </span>
                  </div>
                  <button
                    onClick={() => setViewScreenSession(null)}
                    className="p-1 rounded hover:bg-surface-raised text-muted hover:text-main cursor-pointer"
                    type="button"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="aspect-video w-full rounded border border-app bg-black flex items-center justify-center overflow-hidden">
                  {viewScreenSession.screen_thumbnail ? (
                    <img
                      src={viewScreenSession.screen_thumbnail}
                      alt="Student Live Screen Stream"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-muted space-y-1">
                      <Monitor size={32} className="mx-auto text-muted/50" />
                      <p className="text-xs">SCREEN STREAM CONNECTING...</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-[10px] text-secondary">
                  <span>Candidate: {viewScreenSession.student_name} ({viewScreenSession.track_title})</span>
                  <span className="text-[#10B981] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                    RECEIVING LIVE SCREEN CAPTURES
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* EVIDENCE LOGS DRAWER / MODAL */}
        <AnimatePresence>
          {evidenceSession && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEvidenceSession(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl bg-[#0D0D0D] border border-app rounded-xl shadow-2xl z-10 overflow-hidden text-main"
              >
                {/* Header */}
                <div className="p-5 border-b border-app bg-surface-raised/40 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-[#D64545] uppercase tracking-mono-label font-medium block">
                      TELEMETRY EVIDENCE // AUDIT TRAIL
                    </span>
                    <h3 className="text-base font-display font-medium text-main uppercase">
                      {evidenceSession.student_name} — {evidenceSession.track_title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setEvidenceSession(null)}
                    className="p-1.5 rounded hover:bg-surface-raised text-muted hover:text-main cursor-pointer"
                    type="button"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Evidence Body */}
                <div className="p-6 max-h-96 overflow-y-auto space-y-4 text-xs">
                  {loadingLogs ? (
                    <div className="py-12 text-center text-muted flex items-center justify-center gap-2">
                      <RefreshCw size={14} className="animate-spin text-[#D64545]" />
                      <span>FETCHING AUDIT LOGS...</span>
                    </div>
                  ) : evidenceLogs.length === 0 ? (
                    <div className="py-12 text-center text-muted space-y-1">
                      <ShieldCheck size={28} className="mx-auto text-[#10B981]" />
                      <p className="uppercase tracking-mono-label">NO INFRACTION EVENTS LOGGED</p>
                      <span className="text-[10px] text-secondary">Session telemetry indicates nominal adherence.</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {evidenceLogs.map((evt) => (
                        <div
                          key={evt.id}
                          className="p-4 rounded border border-app bg-surface space-y-2.5"
                        >
                          <div className="flex justify-between items-center text-[10px]">
                            <span
                              className={`px-2 py-0.5 rounded font-bold uppercase tracking-mono-label ${
                                evt.severity === 'critical'
                                  ? 'bg-[#D64545]/20 text-[#D64545] border border-[#D64545]/40'
                                  : 'bg-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/40'
                              }`}
                            >
                              {evt.event_type}
                            </span>
                            <span className="text-muted">
                              {new Date(evt.created_at).toLocaleTimeString()}
                            </span>
                          </div>

                          <p className="text-secondary text-xs font-sans leading-relaxed">
                            {evt.detail?.reason || evt.detail?.message || 'Proctor security event triggered.'}
                          </p>

                          {/* Captured Frame Snapshot */}
                          {evt.snapshot_url && (
                            <div className="pt-2">
                              <span className="text-[9px] text-muted uppercase tracking-mono-label block mb-1">
                                CAPTURED FRAME SNAPSHOT:
                              </span>
                              <img
                                src={evt.snapshot_url}
                                alt="Violation Frame Evidence"
                                className="w-48 h-auto rounded border border-[#D64545]/40 object-cover"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* TERMINATION CONFIRMATION MODAL */}
        <AnimatePresence>
          {terminateTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setTerminateTarget(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#0D0D0D] border border-[#D64545]/50 rounded-xl shadow-2xl z-10 p-6 space-y-5 text-main font-mono"
              >
                <div className="flex items-center space-x-3 text-[#D64545]">
                  <div className="w-10 h-10 rounded bg-[#D64545]/15 border border-[#D64545]/40 flex items-center justify-center">
                    <AlertOctagon size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-mono-label font-medium block">
                      SECURITY DISQUALIFICATION
                    </span>
                    <h3 className="text-base font-display font-medium uppercase text-white">
                      TERMINATE EXAM SESSION?
                    </h3>
                  </div>
                </div>

                <p className="text-secondary text-xs leading-relaxed font-sans">
                  You are about to disqualify <strong>{terminateTarget.student_name}</strong> from their{' '}
                  <strong>{terminateTarget.track_title}</strong> exam. This will immediately lock their screen in real time.
                </p>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-muted uppercase tracking-mono-label block">
                    TERMINATION REASON:
                  </label>
                  <input
                    type="text"
                    value={terminationReason}
                    onChange={(e) => setTerminationReason(e.target.value)}
                    className="w-full bg-[#161616] border border-app rounded p-2.5 text-xs text-white focus:border-[#D64545] outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setTerminateTarget(null)}
                    className="flex-1 py-2.5 rounded bg-surface-raised border border-app hover:border-white/20 text-muted hover:text-white text-xs uppercase tracking-mono-label cursor-pointer"
                    type="button"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleConfirmTerminate}
                    disabled={terminating}
                    className="flex-1 py-2.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white text-xs uppercase tracking-mono-label font-medium transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    type="button"
                  >
                    {terminating ? (
                      <RefreshCw size={13} className="animate-spin" />
                    ) : (
                      <>
                        <Ban size={13} />
                        <span>DISQUALIFY</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* FULL STUDENT REPORT AUDIT MODAL */}
        <AnimatePresence>
          {selectedReportModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedReportModal(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-3xl bg-[#0D0D0D] border border-app rounded-xl shadow-2xl z-10 overflow-hidden text-main font-mono"
              >
                {/* Header */}
                <div className="p-5 border-b border-app bg-surface-raised/40 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-[#D64545] uppercase tracking-mono-label font-bold block">
                      PERMANENT ACADEMIC REPORT AUDIT
                    </span>
                    <h3 className="text-lg font-display font-medium text-main uppercase">
                      {selectedReportModal.student_name} — {selectedReportModal.track_title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedReportModal(null)}
                    className="p-1.5 rounded hover:bg-surface-raised text-muted hover:text-main cursor-pointer"
                    type="button"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-xs">
                  {/* Summary Metric Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded border border-app bg-surface space-y-1">
                      <span className="text-[9px] text-muted uppercase">SCORE</span>
                      <div className="text-xl font-display font-bold text-main">
                        {selectedReportModal.score} / {selectedReportModal.total_questions}
                      </div>
                    </div>
                    <div className="p-3 rounded border border-app bg-surface space-y-1">
                      <span className="text-[9px] text-muted uppercase">ACCURACY</span>
                      <div className="text-xl font-display font-bold text-[#10B981]">
                        {selectedReportModal.accuracy}%
                      </div>
                    </div>
                    <div className="p-3 rounded border border-app bg-surface space-y-1">
                      <span className="text-[9px] text-muted uppercase">DURATION</span>
                      <div className="text-xl font-display font-bold text-secondary">
                        {selectedReportModal.elapsed_label || '—'}
                      </div>
                    </div>
                    <div className="p-3 rounded border border-app bg-surface space-y-1">
                      <span className="text-[9px] text-muted uppercase">INTEGRITY STATUS</span>
                      <div
                        className={`text-xs font-bold uppercase ${
                          selectedReportModal.is_flagged_for_cheating ? 'text-[#D64545]' : 'text-[#10B981]'
                        }`}
                      >
                        {selectedReportModal.is_flagged_for_cheating ? 'FLAGGED (UNFAIR)' : 'HONEST (CLEAN)'}
                      </div>
                    </div>
                  </div>

                  {/* Cheating & Infractions Section */}
                  {selectedReportModal.is_flagged_for_cheating && (
                    <div className="p-4 rounded border border-[#D64545]/40 bg-[#D64545]/10 space-y-3">
                      <div className="flex items-center space-x-2 text-[#D64545] font-bold">
                        <AlertTriangle size={14} />
                        <span className="uppercase tracking-mono-label">
                          UNFAIR MEANS EVIDENCE AUDIT ({selectedReportModal.infractions_count || 1} EVENTS)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedReportModal.flag_reasons?.map((reason, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-black/60 border border-[#D64545]/40 text-[#D64545] text-[10px] uppercase font-bold"
                          >
                            {reason}
                          </span>
                        ))}
                      </div>

                      {/* Evidence Photo Snapshots */}
                      {selectedReportModal.evidence_snapshots?.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-[#D64545]/30">
                          <span className="text-[10px] text-muted uppercase">CAMERA EVIDENCE CAPTURES:</span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {selectedReportModal.evidence_snapshots.map((snap, idx) => (
                              <div key={idx} className="space-y-1">
                                <img
                                  src={snap.snapshot}
                                  alt="Violation Evidence"
                                  className="w-full aspect-video rounded border border-[#D64545]/40 object-cover"
                                />
                                <span className="text-[8px] text-muted truncate block">{snap.reason}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Unit Breakdown */}
                  {selectedReportModal.unit_stats && Object.keys(selectedReportModal.unit_stats).length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] text-muted uppercase tracking-mono-label block">
                        CURRICULAR UNIT ACCURACY:
                      </span>
                      <div className="space-y-2">
                        {Object.entries(selectedReportModal.unit_stats).map(([unitName, uData]) => (
                          <div key={unitName} className="p-3 rounded border border-app bg-surface space-y-1">
                            <div className="flex justify-between text-secondary">
                              <span className="text-main font-medium">{unitName}</span>
                              <span>
                                {uData.correct} / {uData.total} ({uData.accuracy}%)
                              </span>
                            </div>
                            <div className="w-full h-1 bg-surface-raised rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#10B981]"
                                style={{ width: `${uData.accuracy}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}