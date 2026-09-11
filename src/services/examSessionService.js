import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const LOCAL_STORAGE_SESSIONS_KEY = 'test_maza_active_exam_sessions';
const LOCAL_STORAGE_EVENTS_KEY = 'test_maza_proctoring_events';

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
