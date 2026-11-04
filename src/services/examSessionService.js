import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const LOCAL_STORAGE_SESSIONS_KEY = 'test_maza_active_exam_sessions';
const LOCAL_STORAGE_EVENTS_KEY = 'test_maza_proctoring_events';
const LOCAL_STORAGE_REPORTS_KEY = 'test_maza_exam_reports';
const LOCAL_STORAGE_TEACHER_ACTIONS_KEY = 'test_maza_teacher_actions';

// Feature Flag: Enabled by default, can be toggled via VITE_ENABLE_LIVE_DB
export const isLiveDBEnabled = () => {
  return import.meta.env.VITE_ENABLE_LIVE_DB !== 'false';
};

/**
 * 1. Create a new candidate exam session
 */
export async function createExamSession({
  studentId,
  studentName = 'Candidate',
  studentEmail = '',
  trackId,
  trackTitle = '',
  phase = 1,
  totalQuestions = 0,
}) {
  const localSessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

  const initialSession = {
    id: localSessionId,
    student_id: studentId || 'guest_user',
    student_name: studentName,
    student_email: studentEmail,
    track_id: trackId,
    track_title: trackTitle || trackId,
    phase,
    status: 'in_progress',
    progress_pct: 0,
    risk_score: 0,
    total_questions: totalQuestions,
    answered_count: 0,
    correct_count: 0,
    started_at: new Date().toISOString(),
    ended_at: null,
    terminated_by: null,
    termination_reason: null,
  };

  // Always keep local mirror
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
    localStorage.setItem(
      LOCAL_STORAGE_SESSIONS_KEY,
      JSON.stringify([initialSession, ...existing.filter((s) => s.id !== localSessionId)].slice(0, 50))
    );
  } catch (e) {
    console.warn('Local session storage failed:', e);
  }

  if (!isLiveDBEnabled() || !isSupabaseConfigured) {
    return initialSession;
  }

  try {
    const { data, error } = await supabase
      .from('exam_sessions')
      .insert({
        student_id: studentId,
        student_name: studentName,
        student_email: studentEmail,
        track_id: trackId,
        track_title: trackTitle,
        phase,
        status: 'in_progress',
        progress_pct: 0,
        risk_score: 0,
        total_questions: totalQuestions,
        answered_count: 0,
        correct_count: 0,
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase createExamSession failed, using local mirror:', error.message);
      return initialSession;
    }

    return data;
  } catch (err) {
    console.warn('Supabase createExamSession error:', err);
    return initialSession;
  }
}

/**
 * 2. Update exam progress & current risk score
 */
export async function updateExamProgress({
  sessionId,
  progressPct = 0,
  answeredCount = 0,
  correctCount = 0,
  riskScore = 0,
}) {
  // Update local storage mirror
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
    const updated = existing.map((s) =>
      s.id === sessionId
        ? { ...s, progress_pct: progressPct, answered_count: answeredCount, correct_count: correctCount, risk_score: riskScore }
        : s
    );
    localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(updated));
  } catch (e) {}

  if (!isLiveDBEnabled() || !isSupabaseConfigured || !sessionId || sessionId.startsWith('sess_')) {
    return;
  }

  try {
    await supabase
      .from('exam_sessions')
      .update({
        progress_pct: Math.round(progressPct),
        answered_count: answeredCount,
        correct_count: correctCount,
        risk_score: Math.round(riskScore),
      })
      .eq('id', sessionId);
  } catch (err) {
    console.warn('Supabase updateExamProgress error:', err);
  }
}

/**
 * 3. Log a proctoring violation event
 */
export async function logProctoringViolation({
  sessionId,
  studentId,
  eventType,
  severity = 'warning',
  detail = {},
  snapshotBase64 = null,
}) {
  const localEventId = 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
  const eventRecord = {
    id: localEventId,
    session_id: sessionId,
    student_id: studentId || 'guest_user',
    event_type: eventType,
    severity,
    detail,
    snapshot_url: snapshotBase64,
    created_at: new Date().toISOString(),
  };

  // Local storage mirror
  try {
    const existingEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY) || '[]');
    localStorage.setItem(
      LOCAL_STORAGE_EVENTS_KEY,
      JSON.stringify([eventRecord, ...existingEvents].slice(0, 100))
    );
  } catch (e) {}

  if (!isLiveDBEnabled() || !isSupabaseConfigured || !sessionId || sessionId.startsWith('sess_')) {
    return eventRecord;
  }

  try {
    let snapshotStorageUrl = null;

    // Optional: Upload snapshot to Supabase Storage if available
    if (snapshotBase64 && snapshotBase64.startsWith('data:image')) {
      try {
        const fileName = `violations/${sessionId}/${Date.now()}_${eventType.toLowerCase()}.jpg`;
        const base64Data = snapshotBase64.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        const { data: uploadData } = await supabase.storage
          .from('proctoring-evidence')
          .upload(fileName, blob, { contentType: 'image/jpeg', upsert: true });

        if (uploadData?.path) {
          const { data: publicUrlData } = supabase.storage
            .from('proctoring-evidence')
            .getPublicUrl(uploadData.path);
          snapshotStorageUrl = publicUrlData?.publicUrl || null;
        }
      } catch (uploadErr) {
        // Fall back to storing lightweight data URL or null
        snapshotStorageUrl = null;
      }
    }

    const { data } = await supabase.from('proctoring_events').insert({
      session_id: sessionId,
      student_id: studentId,
      event_type: eventType,
      severity,
      detail,
      snapshot_url: snapshotStorageUrl || (snapshotBase64?.length < 100000 ? snapshotBase64 : null),
    }).select().single();

    return data || eventRecord;
  } catch (err) {
    console.warn('Supabase logProctoringViolation error:', err);
    return eventRecord;
  }
}

/**
 * 4. Mark exam completed
 */
export async function completeExamSession({ sessionId, answeredCount, correctCount, riskScore }) {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
    const updated = existing.map((s) =>
      s.id === sessionId
        ? {
            ...s,
            status: 'completed',
            progress_pct: 100,
            answered_count: answeredCount,
            correct_count: correctCount,
            risk_score: riskScore,
            ended_at: new Date().toISOString(),
          }
        : s
    );
    localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(updated));
  } catch (e) {}

  if (!isLiveDBEnabled() || !isSupabaseConfigured || !sessionId || sessionId.startsWith('sess_')) {
    return;
  }

  try {
    await supabase
      .from('exam_sessions')
      .update({
        status: 'completed',
        progress_pct: 100,
        answered_count: answeredCount,
        correct_count: correctCount,
        risk_score: riskScore,
        ended_at: new Date().toISOString(),
      })
      .eq('id', sessionId);
  } catch (err) {
    console.warn('Supabase completeExamSession error:', err);
  }
}

/**
 * 5. Terminate an exam session (Faculty or Automated Strike Lockout)
 */
export async function terminateExamSession({
  sessionId,
  facultyId = null,
  reason = 'Proctoring security policy violated',
}) {
  // Update local storage mirror
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
    const updated = existing.map((s) =>
      s.id === sessionId
        ? {
            ...s,
            status: 'terminated',
            terminated_by: facultyId,
            termination_reason: reason,
            ended_at: new Date().toISOString(),
          }
        : s
    );
    localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(updated));
  } catch (e) {}

  if (!isLiveDBEnabled() || !isSupabaseConfigured || !sessionId || sessionId.startsWith('sess_')) {
    return;
  }

  try {
    await supabase
      .from('exam_sessions')
      .update({
        status: 'terminated',
        terminated_by: facultyId,
        termination_reason: reason,
        ended_at: new Date().toISOString(),
      })
      .eq('id', sessionId);

    // Also log termination event
    await supabase.from('proctoring_events').insert({
      session_id: sessionId,
      student_id: facultyId || 'system_proctor',
      event_type: 'FACULTY_TERMINATE',
      severity: 'critical',
      detail: { reason, terminatedBy: facultyId },
    });
  } catch (err) {
    console.warn('Supabase terminateExamSession error:', err);
  }
}

/**
 * 6. Fetch all active or recent exam sessions for Faculty Live Monitor
 */
export async function getActiveExamSessions() {
  if (!isLiveDBEnabled() || !isSupabaseConfigured) {
    try {
      const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
      return local;
    } catch {
      return [];
    }
  }

  try {
    const { data, error } = await supabase
      .from('exam_sessions')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(50);

    if (error) {
      console.warn('Supabase getActiveExamSessions failed, returning local:', error.message);
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
    }

    return data || [];
  } catch (err) {
    console.warn('Supabase getActiveExamSessions error:', err);
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
  }
}

/**
 * 7. Fetch all violation events for a specific session
 */
export async function getSessionViolationEvents(sessionId) {
  if (!isLiveDBEnabled() || !isSupabaseConfigured || !sessionId || sessionId.startsWith('sess_')) {
    try {
      const allEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY) || '[]');
      return allEvents.filter((e) => e.session_id === sessionId);
    } catch {
      return [];
    }
  }

  try {
    const { data, error } = await supabase
      .from('proctoring_events')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });

    if (error) {
      const allEvents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY) || '[]');
      return allEvents.filter((e) => e.session_id === sessionId);
    }

    return data || [];
  } catch (err) {
    return [];
  }
}

/**
 * 8. Realtime Channel Subscription for Faculty Live Monitor
 */
export function subscribeToActiveSessions(onSessionChange) {
  if (!isLiveDBEnabled() || !isSupabaseConfigured) {
    // Polling fallback for local mode
    const interval = setInterval(() => {
      try {
        const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
        onSessionChange({ eventType: 'POLL', sessions: local });
      } catch (e) {}
    }, 2500);

    return () => clearInterval(interval);
  }

  try {
    const channel = supabase
      .channel('faculty-exam-sessions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'exam_sessions' },
        (payload) => {
          onSessionChange({ eventType: payload.eventType, new: payload.new, old: payload.old });
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'proctoring_events' },
        (payload) => {
          onSessionChange({ eventType: 'VIOLATION_INSERT', newEvent: payload.new });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Realtime subscription failed:', err);
    return () => {};
  }
}

/**
 * 9. Realtime Channel Subscription for Student's Client (Remote Termination Listener)
 */
export function subscribeToStudentTermination(sessionId, onTerminated) {
  if (!sessionId) return () => {};

  // Local storage cross-tab storage event listener
  const handleStorage = (e) => {
    if (e.key === LOCAL_STORAGE_SESSIONS_KEY) {
      try {
        const sessions = JSON.parse(e.newValue || '[]');
        const current = sessions.find((s) => s.id === sessionId);
        if (current && current.status === 'terminated') {
          onTerminated({
            reason: current.termination_reason || 'Terminated by Faculty Proctor',
            terminatedBy: current.terminated_by,
          });
        }
      } catch (err) {}
    }
  };

  window.addEventListener('storage', handleStorage);

  if (!isLiveDBEnabled() || !isSupabaseConfigured || sessionId.startsWith('sess_')) {
    return () => window.removeEventListener('storage', handleStorage);
  }

  try {
    const channel = supabase
      .channel(`student-session-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'exam_sessions',
          filter: `id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.new && payload.new.status === 'terminated') {
            onTerminated({
              reason: payload.new.termination_reason || 'Terminated by Faculty Proctor',
              terminatedBy: payload.new.terminated_by,
            });
          }
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('storage', handleStorage);
      supabase.removeChannel(channel);
    };
  } catch (err) {
    return () => window.removeEventListener('storage', handleStorage);
  }
}

/**
 * 10. Save Complete Student Exam Report (Permanent Server & Local Storage)
 */
export async function saveCompletedExamReport({
  sessionId,
  studentId,
  studentName = 'Candidate',
  studentEmail = '',
  trackId,
  trackTitle = '',
  phase = 1,
  totalQuestions = 0,
  answeredCount = 0,
  correctCount = 0,
  score = 0,
  accuracy = 0,
  durationMs = 0,
  elapsedLabel = '',
  unitStats = {},
  answers = {},
  infractionsCount = 0,
  isFlaggedForCheating = false,
  flagReasons = [],
  evidenceSnapshots = [],
}) {
  const localReportId = 'rep_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

  const reportPayload = {
    id: localReportId,
    session_id: sessionId,
    student_id: studentId || 'guest_user',
    student_name: studentName,
    student_email: studentEmail,
    track_id: trackId,
    track_title: trackTitle,
    phase,
    total_questions: totalQuestions,
    answered_count: answeredCount,
    correct_count: correctCount,
    score,
    accuracy,
    duration_ms: durationMs,
    elapsed_label: elapsedLabel,
    unit_stats: unitStats,
    answers: answers,
    infractions_count: infractionsCount,
    is_flagged_for_cheating: isFlaggedForCheating,
    flag_reasons: flagReasons,
    evidence_snapshots: evidenceSnapshots,
    created_at: new Date().toISOString(),
  };

  // Local storage mirror
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY) || '[]');
    localStorage.setItem(
      LOCAL_STORAGE_REPORTS_KEY,
      JSON.stringify([reportPayload, ...existing].slice(0, 100))
    );
  } catch (e) {
    console.warn('Local storage save report failed:', e);
  }

  if (!isLiveDBEnabled() || !isSupabaseConfigured) {
    return reportPayload;
  }

  try {
    const { data, error } = await supabase
      .from('exam_reports')
      .insert({
        session_id: sessionId,
        student_id: studentId || 'guest_user',
        student_name: studentName,
        student_email: studentEmail,
        track_id: trackId,
        track_title: trackTitle,
        phase,
        total_questions: totalQuestions,
        answered_count: answeredCount,
        correct_count: correctCount,
        score,
        accuracy,
        duration_ms: durationMs,
        elapsed_label: elapsedLabel,
        unit_stats: unitStats,
        answers: answers,
        infractions_count: infractionsCount,
        is_flagged_for_cheating: isFlaggedForCheating,
        flag_reasons: flagReasons,
        evidence_snapshots: evidenceSnapshots,
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase saveCompletedExamReport failed:', error.message);
      return reportPayload;
    }

    return data;
  } catch (err) {
    console.warn('Supabase saveCompletedExamReport error:', err);
    return reportPayload;
  }
}

/**
 * 11. Fetch All Stored Exam Reports (Faculty & Administrator Dashboards)
 */
export async function getExamReports(filters = {}) {
  const getLocal = () => {
    try {
      let reports = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY) || '[]');
      if (filters.isFlaggedOnly) {
        reports = reports.filter((r) => r.is_flagged_for_cheating);
      }
      if (filters.trackId && filters.trackId !== 'ALL') {
        reports = reports.filter((r) => r.track_id === filters.trackId);
      }
      return reports;
    } catch {
      return [];
    }
  };

  if (!isLiveDBEnabled() || !isSupabaseConfigured) {
    return getLocal();
  }

  try {
    let query = supabase
      .from('exam_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.isFlaggedOnly) {
      query = query.eq('is_flagged_for_cheating', true);
    }
    if (filters.trackId && filters.trackId !== 'ALL') {
      query = query.eq('track_id', filters.trackId);
    }

    const { data, error } = await query.limit(100);

    if (error) {
      console.warn('Supabase getExamReports failed, using local mirror:', error.message);
      return getLocal();
    }

    return data && data.length > 0 ? data : getLocal();
  } catch (err) {
    console.warn('Supabase getExamReports error:', err);
    return getLocal();
  }
}

/**
 * 12. Realtime Channel Subscription for Exam Reports
 */
export function subscribeToExamReports(onNewReport) {
  if (!isLiveDBEnabled() || !isSupabaseConfigured) {
    return () => {};
  }

  try {
    const channel = supabase
      .channel('reports-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'exam_reports' },
        (payload) => {
          if (payload.new) {
            onNewReport(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Realtime reports subscription failed:', err);
    return () => {};
  }
}

/**
 * 13. Send Live Motivation from Teacher to Student
 */
export async function sendTeacherMotivation({
  sessionId,
  teacherId = 'faculty_proctor',
  teacherName = 'Faculty Proctor',
  message,
}) {
  const actionPayload = {
    id: 'act_' + Date.now(),
    session_id: sessionId,
    teacher_id: teacherId,
    teacher_name: teacherName,
    action_type: 'MOTIVATE',
    message,
    created_at: new Date().toISOString(),
  };

  // Local storage mirror
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEACHER_ACTIONS_KEY) || '[]');
    localStorage.setItem(
      LOCAL_STORAGE_TEACHER_ACTIONS_KEY,
      JSON.stringify([actionPayload, ...existing].slice(0, 100))
    );

    // Update active session mirror as well
    const sessions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
    const updated = sessions.map((s) =>
      s.id === sessionId
        ? {
            ...s,
            latest_teacher_motivation: message,
            motivation_timestamp: actionPayload.created_at,
          }
        : s
    );
    localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(updated));
  } catch (e) {}

  if (!isLiveDBEnabled() || !isSupabaseConfigured || !sessionId || sessionId.startsWith('sess_')) {
    return actionPayload;
  }

  try {
    // 1. Update session latest motivation
    await supabase
      .from('exam_sessions')
      .update({
        latest_teacher_motivation: message,
        motivation_timestamp: new Date().toISOString(),
      })
      .eq('id', sessionId);

    // 2. Insert into teacher_actions table
    await supabase.from('teacher_actions').insert({
      session_id: sessionId,
      teacher_id: teacherId,
      teacher_name: teacherName,
      action_type: 'MOTIVATE',
      message,
    });

    return actionPayload;
  } catch (err) {
    console.warn('Supabase sendTeacherMotivation error:', err);
    return actionPayload;
  }
}

/**
 * 14. Realtime Channel Subscription for Student: Listen for Live Teacher Motivation
 */
export function subscribeToTeacherMotivation(sessionId, onMotivation) {
  if (!sessionId) return () => {};

  // Local storage cross-tab listener
  const handleStorage = (e) => {
    if (e.key === LOCAL_STORAGE_TEACHER_ACTIONS_KEY) {
      try {
        const actions = JSON.parse(e.newValue || '[]');
        const latest = actions.find((a) => a.session_id === sessionId && a.action_type === 'MOTIVATE');
        if (latest && Date.now() - new Date(latest.created_at).getTime() < 10000) {
          onMotivation(latest);
        }
      } catch (err) {}
    }
  };

  window.addEventListener('storage', handleStorage);

  if (!isLiveDBEnabled() || !isSupabaseConfigured || sessionId.startsWith('sess_')) {
    return () => window.removeEventListener('storage', handleStorage);
  }

  try {
    const channel = supabase
      .channel(`student-motivation-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'teacher_actions',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.new && payload.new.action_type === 'MOTIVATE') {
            onMotivation(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('storage', handleStorage);
      supabase.removeChannel(channel);
    };
  } catch (err) {
    return () => window.removeEventListener('storage', handleStorage);
  }
}

/**
 * 15. Update Student Screen Share Telemetry
 */
export async function updateScreenShareStatus(sessionId, isActive, thumbnailBase64 = null) {
  // Local storage mirror
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY) || '[]');
    const updated = existing.map((s) =>
      s.id === sessionId
        ? {
            ...s,
            screen_share_active: isActive,
            screen_thumbnail: thumbnailBase64 || s.screen_thumbnail,
          }
        : s
    );
    localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(updated));
  } catch (e) {}

  if (!isLiveDBEnabled() || !isSupabaseConfigured || !sessionId || sessionId.startsWith('sess_')) {
    return;
  }

  try {
    const updates = { screen_share_active: isActive };
    if (thumbnailBase64) {
      updates.screen_thumbnail = thumbnailBase64;
    }
    await supabase.from('exam_sessions').update(updates).eq('id', sessionId);
  } catch (err) {
    console.warn('Supabase updateScreenShareStatus error:', err);
  }
}

/**
 * 16. Get All Teacher Actions (For Admin Audit & History)
 */
export async function getTeacherActions(sessionId = null) {
  const getLocal = () => {
    try {
      const actions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEACHER_ACTIONS_KEY) || '[]');
      return sessionId ? actions.filter((a) => a.session_id === sessionId) : actions;
    } catch {
      return [];
    }
  };

  if (!isLiveDBEnabled() || !isSupabaseConfigured) {
    return getLocal();
  }

  try {
    let query = supabase
      .from('teacher_actions')
      .select('*')
      .order('created_at', { ascending: false });

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }

    const { data, error } = await query.limit(50);
    if (error || !data) return getLocal();
    return data.length > 0 ? data : getLocal();
  } catch (err) {
    return getLocal();
  }
}
