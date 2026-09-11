import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Ban,
  CheckCircle,
  Eye,
  Filter,
  Flame,
  GraduationCap,
  Layers,
  Radio,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  User,
  UserX,
  Users,
  Video,
  Volume2,
  X,
} from 'lucide-react';
import { PageTransition } from '../../components/common/PageTransition';
import {
  getActiveExamSessions,
  getSessionViolationEvents,
  terminateExamSession,
  subscribeToActiveSessions,
} from '../../services/examSessionService';
import { useApp } from '../../context/AppContext';

export function LiveExamMonitorPage() {
  const { addToast, user } = useApp();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrackFilter, setSelectedTrackFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('risk_desc'); // 'risk_desc' | 'recent' | 'progress'

  // Modal states
  const [evidenceSession, setEvidenceSession] = useState(null);
  const [evidenceLogs, setEvidenceLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const [terminateTarget, setTerminateTarget] = useState(null);
  const [terminationReason, setTerminationReason] = useState('Unauthorized communication detected by proctor');
  const [terminating, setTerminating] = useState(false);

  // 1. Initial Fetch
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

  useEffect(() => {
    loadSessions();

    // 2. Realtime Subscription
    const unsubscribe = subscribeToActiveSessions((payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        setSessions((prev) => [payload.new, ...prev.filter((s) => s.id !== payload.new.id)]);
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        setSessions((prev) => prev.map((s) => (s.id === payload.new.id ? payload.new : s)));
      } else if (payload.eventType === 'POLL' && payload.sessions) {
        setSessions(payload.sessions);
      }
    });

    return () => unsubscribe();
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
        facultyId: user?.id || 'faculty_user',
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

  // 5. Filter & Sort
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

  const activeCount = sessions.filter((s) => s.status === 'in_progress').length;
  const highRiskCount = sessions.filter((s) => s.status === 'in_progress' && (s.risk_score || 0) > 60).length;
  const terminatedCount = sessions.filter((s) => s.status === 'terminated').length;

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24 space-y-10 font-mono text-xs">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 hairline-b pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] tracking-mono-label text-[#D64545] uppercase">
              <Radio size={13} className="text-[#D64545] animate-pulse" />
              <span>FACULTY COMMAND // LIVE EXAMINATION SUPERVISOR</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-medium text-main uppercase">
              LIVE EXAM ROOM.
            </h1>
            <p className="text-xs text-secondary font-body max-w-xl leading-relaxed">
              Real-time multi-modal proctor surveillance room. Monitor live candidate progress, AI risk fusion telemetry, and issue remote session disqualifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] tracking-mono-label uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span>REALTIME SYNC ACTIVE</span>
            </div>
            <button
              onClick={loadSessions}
              className="p-2 rounded bg-surface-raised border border-app hover:border-[#D64545] text-muted hover:text-white transition-colors cursor-pointer"
              title="Refresh Sessions"
              type="button"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Global Live Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <span className="text-[10px] text-muted uppercase">TOTAL DISQUALIFIED</span>
            <div className="text-3xl font-display font-medium text-muted">{terminatedCount}</div>
            <span className="text-[10px] text-muted block">// SECURITY BREACH LOCKOUTS</span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="p-4 rounded-lg border border-app bg-surface flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3.5 top-3 text-muted" />
            <input
              type="text"
              placeholder="Search candidate name, email, or track title..."
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

        {/* Candidate Session Grid / Table */}
        {filteredSessions.length === 0 ? (
          <div className="py-20 text-center border border-app rounded-lg bg-surface text-muted space-y-2">
            <Users size={28} className="mx-auto text-muted/50" />
            <p className="text-xs uppercase tracking-mono-label">NO ACTIVE CANDIDATE SESSIONS RECORDED</p>
            <span className="text-[10px] text-secondary">
              When students launch a proctored exam, their live telemetry and risk score will stream here in real time.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((sess) => {
              const risk = sess.risk_score || 0;
              const isTerminated = sess.status === 'terminated';
              const isCompleted = sess.status === 'completed';

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
                          <span className="text-main font-medium text-xs block truncate max-w-[160px]">
                            {sess.student_name || 'Candidate'}
                          </span>
                          <span className="text-[10px] text-muted truncate block max-w-[160px]">
                            {sess.student_email || 'student@academic.edu'}
                          </span>
                        </div>
                      </div>

                      <div className={`px-2 py-0.5 rounded border text-[9px] uppercase tracking-mono-label font-medium ${riskBadgeClass}`}>
                        RISK: {risk}/100
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
                  <div className="flex items-center gap-2 pt-3 border-t border-app">
                    <button
                      onClick={() => handleOpenEvidence(sess)}
                      className="flex-1 py-2 px-3 rounded bg-surface-raised border border-app hover:border-[#D64545] text-main text-[10px] tracking-mono-label uppercase font-medium flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                      type="button"
                    >
                      <Eye size={12} />
                      <span>EVIDENCE LOG</span>
                    </button>

                    {!isTerminated && !isCompleted && (
                      <button
                        onClick={() => {
                          setTerminateTarget(sess);
                          setTerminationReason('Unauthorized communication detected by proctor');
                        }}
                        className="py-2 px-3 rounded bg-[#D64545]/15 border border-[#D64545]/40 hover:bg-[#D64545] text-[#D64545] hover:text-white text-[10px] tracking-mono-label uppercase font-medium flex items-center justify-center space-x-1 transition-all cursor-pointer"
                        type="button"
                        title="Disqualify candidate"
                      >
                        <AlertOctagon size={12} />
                        <span>TERMINATE</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

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

                          {/* Captured JPEG Evidence Snapshot */}
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
      </div>
    </PageTransition>
  );
}
