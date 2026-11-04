import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertOctagon,
  AlertTriangle,
  Award,
  Ban,
  CheckCircle,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Lock,
  MessageSquare,
  Radio,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserCheck,
  UserX,
  Users,
  X,
} from 'lucide-react';
import { PageTransition } from '../components/common/PageTransition';
import {
  getExamReports,
  getTeacherActions,
  getActiveExamSessions,
  subscribeToExamReports,
} from '../services/examSessionService';
import { useApp } from '../context/AppContext';

export function AdminPage() {
  const { user, setUser, addToast } = useApp();

  // Primary Tab: 'student_reports' | 'teacher_actions' | 'user_roles' | 'telemetry'
  const [activeTab, setActiveTab] = useState('student_reports');

  // Data states
  const [reports, setReports] = useState([]);
  const [teacherActions, setTeacherActions] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [reportsFilter, setReportsFilter] = useState('all'); // 'all' | 'flagged'
  const [selectedReportModal, setSelectedReportModal] = useState(null);

  // Security Watchdog Telemetry
  const [securityLogs] = useState([
    { id: 'sec-1', event: 'HARDWARE_KEYBOARD_LOCK_ARMED', target: 'GLOBAL_SYS_HOOK', ip: '127.0.0.1', status: 'LOCKED', time: '14:12:05' },
    { id: 'sec-2', event: 'BIOMETRIC_VISION_CALIBRATED', target: 'FACE_DETECTOR_NODE', ip: '127.0.0.1', status: 'ACTIVE', time: '13:48:22' },
    { id: 'sec-3', event: 'REPORT_DATABASE_PIPELINE', target: 'SUPABASE_PG_REPORT', ip: '127.0.0.1', status: 'HEALTHY', time: '12:15:30' },
    { id: 'sec-4', event: 'TEACHER_ACTION_BROADCAST_HUB', target: 'REALTIME_CHANNEL', ip: '127.0.0.1', status: 'ONLINE', time: '11:05:14' },
  ]);

  // Load All Admin Records (Both Student & Faculty Data)
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [reportsData, actionsData, sessionsData] = await Promise.all([
        getExamReports(),
        getTeacherActions(),
        getActiveExamSessions(),
      ]);
      setReports(reportsData || []);
      setTeacherActions(actionsData || []);
      setActiveSessions(sessionsData || []);
    } catch (e) {
      console.warn('Failed to load admin records:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();

    const unsubscribe = subscribeToExamReports((newRep) => {
      setReports((prev) => [newRep, ...prev.filter((r) => r.id !== newRep.id)]);
    });

    return () => unsubscribe();
  }, []);

  // Filtered Student Reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (reportsFilter === 'flagged' && !r.is_flagged_for_cheating) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = r.student_name?.toLowerCase().includes(q);
        const matchEmail = r.student_email?.toLowerCase().includes(q);
        const matchTrack = r.track_title?.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchTrack) return false;
      }
      return true;
    });
  }, [reports, reportsFilter, searchQuery]);

  // Filtered Faculty Actions
  const filteredTeacherActions = useMemo(() => {
    if (!searchQuery) return teacherActions;
    const q = searchQuery.toLowerCase();
    return teacherActions.filter((a) => {
      return (
        a.teacher_name?.toLowerCase().includes(q) ||
        a.action_type?.toLowerCase().includes(q) ||
        a.message?.toLowerCase().includes(q) ||
        a.session_id?.toLowerCase().includes(q)
      );
    });
  }, [teacherActions, searchQuery]);

  // System Metric Counts
  const totalReportsCount = reports.length;
  const flaggedCheatingCount = reports.filter((r) => r.is_flagged_for_cheating).length;
  const totalFacultyActionsCount = teacherActions.length;
  const activeExamsCount = activeSessions.filter((s) => s.status === 'in_progress').length;

  // Mock User Directory for Role Management
  const [usersList, setUsersList] = useState([
    { id: 'usr-1', name: user?.name || 'Administrator', email: user?.email || 'admin@testmaza.edu', role: 'Administrator', status: 'ACTIVE', lastActive: 'Just now' },
    { id: 'usr-2', name: 'Prof. Ramesh Sharma', email: 'sharma.faculty@academic.edu', role: 'Faculty', status: 'ACTIVE', lastActive: '10m ago' },
    { id: 'usr-3', name: 'Dr. Priya Mehta', email: 'priya.mehta@academic.edu', role: 'Faculty', status: 'ACTIVE', lastActive: '1h ago' },
    { id: 'usr-4', name: 'Aditya Verma', email: 'aditya.v@student.edu', role: 'Student', status: 'ACTIVE', lastActive: '2h ago' },
    { id: 'usr-5', name: 'Sneha Patel', email: 'sneha.p@student.edu', role: 'Student', status: 'ACTIVE', lastActive: '1d ago' },
  ]);

  const handleChangeUserRole = (userId, newRole) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (userId === 'usr-1') {
      setUser((prev) => ({ ...prev, role: newRole }));
    }
    addToast('success', 'USER ROLE UPDATED', `Assigned ${newRole} privileges to user.`);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-8 font-mono text-xs">
        {/* Header */}
        <div className="border-b border-app pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] tracking-mono-label text-[#38bdf8] uppercase font-bold">
              <ShieldCheck size={14} />
              <span>SUPREME SYSTEM ADMINISTRATOR // CENTRAL REGISTRY</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-main uppercase">
              ADMIN CONTROL ROOM.
            </h1>
            <p className="text-xs sm:text-sm text-secondary font-sans max-w-2xl leading-relaxed">
              Unified governance hub. Manage records across both students and faculty, audit cheating investigations with evidence photos, monitor teacher interventions, and manage security parameters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 text-[10px] tracking-mono-label uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
              <span>FULL ADMINISTRATIVE ACCESS</span>
            </div>
            <button
              onClick={loadAllData}
              className="p-2 rounded bg-surface-raised border border-app hover:border-[#38bdf8] text-muted hover:text-white transition-colors cursor-pointer"
              title="Refresh Central Database"
              type="button"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Global Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-[#38bdf8]/40 bg-[#38bdf8]/10 shadow-xs space-y-1">
            <span className="text-[10px] text-[#38bdf8] uppercase font-bold">TOTAL STUDENT EXAM REPORTS</span>
            <div className="text-3xl font-display font-bold text-main">{totalReportsCount}</div>
            <span className="text-[10px] text-[#10B981] block font-semibold">// STORED ON SUPABASE</span>
          </div>

          <div className="p-5 rounded-2xl border border-app bg-surface shadow-xs space-y-1">
            <span className="text-[10px] text-muted uppercase font-bold">UNFAIR MEANS DETECTED</span>
            <div className="text-3xl font-display font-bold text-[#D64545]">{flaggedCheatingCount}</div>
            <span className="text-[10px] text-[#D64545] block font-semibold">// CHEATING EVIDENCE FLAGGED</span>
          </div>

          <div className="p-5 rounded-2xl border border-app bg-surface shadow-xs space-y-1">
            <span className="text-[10px] text-muted uppercase font-bold">FACULTY ACTIONS LOGGED</span>
            <div className="text-3xl font-display font-bold text-[#f59e0b]">{totalFacultyActionsCount}</div>
            <span className="text-[10px] text-muted block font-semibold">// MOTIVATIONS &amp; LOCKOUTS</span>
          </div>

          <div className="p-5 rounded-2xl border border-app bg-surface shadow-xs space-y-1">
            <span className="text-[10px] text-muted uppercase font-bold">CONCURRENT ACTIVE EXAMS</span>
            <div className="text-3xl font-display font-bold text-[#10B981]">{activeExamsCount}</div>
            <span className="text-[10px] text-[#10B981] block font-semibold">// LIVE IN PROCTOR HUD</span>
          </div>
        </div>

        {/* Primary View Tab Switcher */}
        <div className="flex border-b border-app overflow-x-auto">
          <button
            onClick={() => setActiveTab('student_reports')}
            className={`py-3 px-5 text-xs font-mono tracking-mono-label uppercase font-medium flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'student_reports'
                ? 'border-[#38bdf8] text-main bg-surface-raised/40 font-bold'
                : 'border-transparent text-secondary hover:text-main'
            }`}
            type="button"
          >
            <FileText size={13} className={activeTab === 'student_reports' ? 'text-[#38bdf8]' : ''} />
            <span>01 / ALL STUDENT EXAM REPORTS ({reports.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('teacher_actions')}
            className={`py-3 px-5 text-xs font-mono tracking-mono-label uppercase font-medium flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'teacher_actions'
                ? 'border-[#38bdf8] text-main bg-surface-raised/40 font-bold'
                : 'border-transparent text-secondary hover:text-main'
            }`}
            type="button"
          >
            <Sparkles size={13} className={activeTab === 'teacher_actions' ? 'text-[#38bdf8]' : ''} />
            <span>02 / FACULTY SUPERVISION AUDIT ({teacherActions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('user_roles')}
            className={`py-3 px-5 text-xs font-mono tracking-mono-label uppercase font-medium flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'user_roles'
                ? 'border-[#38bdf8] text-main bg-surface-raised/40 font-bold'
                : 'border-transparent text-secondary hover:text-main'
            }`}
            type="button"
          >
            <Users size={13} className={activeTab === 'user_roles' ? 'text-[#38bdf8]' : ''} />
            <span>03 / USER ROLES &amp; PERMISSIONS</span>
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            className={`py-3 px-5 text-xs font-mono tracking-mono-label uppercase font-medium flex items-center space-x-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'telemetry'
                ? 'border-[#38bdf8] text-main bg-surface-raised/40 font-bold'
                : 'border-transparent text-secondary hover:text-main'
            }`}
            type="button"
          >
            <Terminal size={13} className={activeTab === 'telemetry' ? 'text-[#38bdf8]' : ''} />
            <span>04 / SECURITY WATCHDOG STREAM</span>
          </button>
        </div>

        {/* TAB 1: ALL STUDENT EXAM REPORTS */}
        {activeTab === 'student_reports' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="p-4 rounded-lg border border-app bg-surface flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-3.5 top-3 text-muted" />
                <input
                  type="text"
                  placeholder="Filter student reports by candidate name, email, or curriculum track..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#161616] border border-app rounded pl-10 pr-4 py-2 text-xs text-main placeholder:text-muted/50 focus:border-[#38bdf8] outline-none"
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
                  ALL ({reports.length})
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
                  <span>UNFAIR MEANS ONLY ({flaggedCheatingCount})</span>
                </button>
              </div>
            </div>

            {/* List */}
            {filteredReports.length === 0 ? (
              <div className="py-20 text-center border border-app rounded-lg bg-surface text-muted space-y-2">
                <FileText size={28} className="mx-auto text-muted/50" />
                <p className="text-xs uppercase tracking-mono-label">NO EXAM RECORDS FOUND</p>
                <span className="text-[10px] text-secondary">
                  When examinees complete tests, their server-side reports will automatically appear here.
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
                          <span className="text-[10px] text-muted">
                            ({rep.student_email || 'student@academic.edu'})
                          </span>
                          {isFlagged ? (
                            <span className="px-2 py-0.5 rounded bg-[#D64545]/20 text-[#D64545] border border-[#D64545]/40 text-[9px] uppercase tracking-mono-label font-bold flex items-center gap-1">
                              <AlertTriangle size={10} /> CHEATING FLAGGED
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[9px] uppercase tracking-mono-label font-bold flex items-center gap-1">
                              <CheckCircle2 size={10} /> HONEST SUBMISSION
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-secondary">
                          <span className="text-[#38bdf8] font-medium">{rep.track_title || rep.track_id}</span>
                          <span>Phase {rep.phase || 1}</span>
                          <span>Score: {rep.score}/{rep.total_questions} ({rep.accuracy || 0}%)</span>
                          <span>Time: {rep.elapsed_label || `${Math.round(rep.duration_ms / 1000)}s`}</span>
                          <span className="text-muted">{dateStr}</span>
                        </div>

                        {/* Infractions Badges */}
                        {isFlagged && rep.flag_reasons?.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[9px] text-muted uppercase">VIOLATIONS:</span>
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

                      <button
                        onClick={() => setSelectedReportModal(rep)}
                        className="py-2 px-4 rounded bg-surface-raised border border-app hover:border-[#38bdf8] text-main text-xs uppercase tracking-mono-label font-medium flex items-center space-x-2 transition-all cursor-pointer shrink-0"
                        type="button"
                      >
                        <Eye size={12} />
                        <span>AUDIT EVIDENCE &amp; ANSWERS</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FACULTY SUPERVISION ACTIONS & INTERVENTIONS */}
        {activeTab === 'teacher_actions' && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg border border-app bg-surface flex items-center">
              <Search size={14} className="text-muted mr-3" />
              <input
                type="text"
                placeholder="Search teacher actions by faculty name, action type, or message text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-main placeholder:text-muted/50 outline-none"
              />
            </div>

            {filteredTeacherActions.length === 0 ? (
              <div className="py-20 text-center border border-app rounded-lg bg-surface text-muted space-y-2">
                <Sparkles size={28} className="mx-auto text-muted/50" />
                <p className="text-xs uppercase tracking-mono-label">NO FACULTY ACTIONS RECORDED YET</p>
                <span className="text-[10px] text-secondary">
                  When teachers send live motivation, issue warnings, or disqualify students, those actions will be cataloged here.
                </span>
              </div>
            ) : (
              <div className="rounded-xl border border-app bg-surface divide-y divide-app">
                {filteredTeacherActions.map((act) => {
                  const isDisqualify = act.action_type === 'DISQUALIFY';
                  const dateStr = new Date(act.created_at).toLocaleString();

                  return (
                    <div key={act.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-mono-label font-bold ${
                              isDisqualify
                                ? 'bg-[#D64545]/20 text-[#D64545] border border-[#D64545]/40'
                                : 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                            }`}
                          >
                            {act.action_type || 'MOTIVATE'}
                          </span>
                          <span className="text-main font-medium">{act.teacher_name || 'Faculty Member'}</span>
                          <span className="text-muted text-[10px]">Session ID: {act.session_id}</span>
                        </div>
                        <p className="text-secondary text-xs font-sans">
                          "{act.message}"
                        </p>
                      </div>
                      <span className="text-[10px] text-muted shrink-0">{dateStr}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: USER ROLES & ACCESS MANAGEMENT */}
        {activeTab === 'user_roles' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-app bg-surface overflow-hidden">
              <div className="p-4 border-b border-app bg-surface-raised/40 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-mono-label text-muted font-bold">
                  ACADEMIC IDENTITY &amp; ACCESS CONTROL DIRECTORY
                </span>
                <span className="text-[10px] text-[#38bdf8] font-bold">
                  STRICT ROLE GATING ENABLED
                </span>
              </div>

              <div className="divide-y divide-app">
                {usersList.map((usr) => (
                  <div key={usr.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8] flex items-center justify-center font-bold text-[10px]">
                          {usr.name.charAt(0)}
                        </div>
                        <span className="text-main font-medium">{usr.name}</span>
                        <span className="text-[10px] text-muted">({usr.email})</span>
                      </div>
                      <span className="text-[10px] text-secondary block">
                        Last Active: {usr.lastActive} • Status: {usr.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted uppercase">ASSIGNED ROLE:</span>
                      <select
                        value={usr.role}
                        onChange={(e) => handleChangeUserRole(usr.id, e.target.value)}
                        className="bg-[#161616] border border-app rounded px-2.5 py-1 text-xs text-main outline-none focus:border-[#38bdf8] cursor-pointer"
                      >
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Administrator">Administrator</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY WATCHDOG STREAM */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4">
            <div className="flex justify-between items-baseline border-b border-app pb-2">
              <span className="text-[10px] font-mono tracking-widest text-[#38bdf8] uppercase flex items-center gap-1.5 font-bold">
                <Terminal size={14} />
                REAL-TIME PROCTOR TELEMETRY &amp; HARDWARE LOCK STREAM
              </span>
              <span className="text-xs font-mono text-[#10B981] font-bold">SYSTEM OPERATIONAL</span>
            </div>

            <div className="rounded-2xl border border-app bg-surface p-4 divide-y divide-app font-mono text-xs shadow-xs">
              {securityLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] text-muted">{log.time}</span>
                    <span className="text-[#38bdf8] font-bold">{log.event}</span>
                    <span className="text-secondary">[{log.target}]</span>
                  </div>
                  <span className="text-[10px] text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded-md border border-[#10B981]/30 font-bold">
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

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
                    <span className="text-[10px] text-[#38bdf8] uppercase tracking-mono-label font-bold block">
                      SUPREME ADMINISTRATIVE REPORT AUDIT
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
                        {selectedReportModal.is_flagged_for_cheating ? 'FLAGGED FOR CHEATING' : 'HONEST INTEGRITY'}
                      </div>
                    </div>
                  </div>

                  {/* Cheating & Infractions Section */}
                  {selectedReportModal.is_flagged_for_cheating && (
                    <div className="p-4 rounded border border-[#D64545]/40 bg-[#D64545]/10 space-y-3">
                      <div className="flex items-center space-x-2 text-[#D64545] font-bold">
                        <AlertTriangle size={14} />
                        <span className="uppercase tracking-mono-label">
                          UNFAIR MEANS INVESTIGATION ({selectedReportModal.infractions_count || 1} DETECTIONS)
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