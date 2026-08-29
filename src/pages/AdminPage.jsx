import { AlertOctagon, CheckCircle, Lock, Shield, ShieldCheck, Terminal } from 'lucide-react';
import { PageTransition } from '../components/common/PageTransition';

export function AdminPage() {
  const securityLogs = [
    { id: 'sec-1', event: 'FULLSCREEN_LOCK_INITIALIZED', target: 'CAP555_PHASE_01', ip: '127.0.0.1', status: 'SECURE', time: '14:12:05' },
    { id: 'sec-2', event: 'VISIBILITY_CHANGE_DETECTED', target: 'MTH404_PHASE_02', ip: '127.0.0.1', status: 'WARNING_DISPATCHED', time: '13:48:22' },
    { id: 'sec-3', event: 'EXAM_SUBMISSION_VERIFIED', target: 'PHP_CAP777_PHASE_01', ip: '127.0.0.1', status: 'COMPLETED_CLEAN', time: '12:15:30' },
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-12">
        {/* Header */}
        <div className="border-b border-app pb-6">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#38bdf8] uppercase mb-1 font-bold">
            <ShieldCheck size={14} />
            <span>SYSTEM PROCTOR ADMINISTRATOR</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-main">
            SECURITY WATCHDOG
          </h1>
          <p className="text-xs sm:text-sm text-secondary font-sans max-w-xl mt-2 leading-relaxed">
            Real-time proctoring telemetry, browser security events, fullscreen violation logs, and examination integrity parameters.
          </p>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="p-5 rounded-2xl border border-[#38bdf8]/40 bg-[#38bdf8]/10 shadow-xs">
            <span className="text-[10px] text-[#38bdf8] uppercase block font-bold">PROCTOR ENGINE</span>
            <strong className="text-2xl text-main mt-2 block font-bold">LOCKED & ARMED</strong>
            <span className="text-[10px] text-[#10B981] mt-2 block font-semibold">// STRICT MODE ON</span>
          </div>

          <div className="p-5 rounded-2xl border border-app bg-surface shadow-xs">
            <span className="text-[10px] text-muted uppercase block font-bold">SECURITY INFRACTIONS</span>
            <strong className="text-2xl text-[#10B981] mt-2 block font-bold">0 CRITICAL</strong>
            <span className="text-[10px] text-muted mt-2 block font-semibold">// ZERO ACTIVE LOCKOUTS</span>
          </div>

          <div className="p-5 rounded-2xl border border-app bg-surface shadow-xs">
            <span className="text-[10px] text-muted uppercase block font-bold">EXAM REPOSITORIES</span>
            <strong className="text-2xl text-main mt-2 block font-bold">4 ENCRYPTED</strong>
            <span className="text-[10px] text-[#10B981] mt-2 block font-semibold">// SHA-256 CHECK PASSED</span>
          </div>

          <div className="p-5 rounded-2xl border border-app bg-surface shadow-xs">
            <span className="text-[10px] text-muted uppercase block font-bold">SYSTEM UPTIME</span>
            <strong className="text-2xl text-main mt-2 block font-bold">99.99%</strong>
            <span className="text-[10px] text-muted mt-2 block font-semibold">// 127.0.0.1 NODE ACTIVE</span>
          </div>
        </div>

        {/* Security Events Audit Log */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline border-b border-app pb-2">
            <span className="text-[10px] font-mono tracking-widest text-[#38bdf8] uppercase flex items-center gap-1.5 font-bold">
              <Terminal size={14} />
              REAL-TIME PROCTOR TELEMETRY STREAM
            </span>
            <span className="text-xs font-mono text-muted">LIVE AUDIT</span>
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
      </div>
    </PageTransition>
  );
}
