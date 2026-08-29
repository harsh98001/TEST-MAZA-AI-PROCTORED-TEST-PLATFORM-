import { Lock, Mic, Shield, ShieldAlert, Video } from 'lucide-react';
import { formatDuration } from '../../utils/formatters';
import { PROCTOR_VIOLATION_LIMIT } from '../../utils/constants';
import { useApp } from '../../context/AppContext';

export function ExamHeader({
  courseTitle,
  phaseTitle,
  timeRemaining,
  proctorViolations = [],
  audioLevel = 0,
  hasCamera = false,
  onFinish,
}) {
  const isTimeCritical = timeRemaining < 1000 * 60 * 5; // Less than 5 mins

  return (
    <header className="w-full border-b border-app bg-surface py-3 px-4 sm:px-6 lg:px-8 select-none transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
        {/* Left: Security Status */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-[#D64545]/10 border border-[#D64545]/30 flex items-center justify-center text-[#D64545]">
            <Shield size={16} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#D64545] uppercase tracking-mono-label font-medium">
              {courseTitle} // {phaseTitle}
            </div>
            <span className="text-xs font-mono font-medium text-main uppercase">
              PROCTORED EXAM ENVIRONMENT
            </span>
          </div>
        </div>

        {/* Center: Live Exam Countdown */}
        <div
          className={`flex items-center space-x-2 px-4 py-1.5 rounded font-mono text-xs border transition-colors shadow-xs ${
            isTimeCritical
              ? 'border-[#D64545] bg-[#D64545]/15 text-[#D64545] animate-pulse'
              : 'border-app bg-surface-raised text-main'
          }`}
        >
          <span className="text-muted text-[10px] uppercase">TIME REMAINING:</span>
          <span className="font-semibold">{formatDuration(timeRemaining)}</span>
        </div>

        {/* Right: Warnings, Audio Level & Submit Action */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Live Mic Audio Decibel Pill */}
          <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded border border-app bg-surface-raised text-xs font-mono text-secondary">
            <Mic size={13} className={audioLevel > 60 ? 'text-[#D64545]' : 'text-muted'} />
            <span className="text-[11px]">{audioLevel} dB</span>
          </div>

          {/* Proctor Warnings Chip */}
          <div
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono border ${
              proctorViolations.length > 0
                ? 'border-[#D64545] bg-[#D64545]/15 text-[#D64545]'
                : 'border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]'
            }`}
          >
            <ShieldAlert size={13} />
            <span>
              WARNINGS: {proctorViolations.length}/{PROCTOR_VIOLATION_LIMIT}
            </span>
          </div>

          <button
            onClick={onFinish}
            className="px-4 py-1.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium transition-all shadow-xs cursor-pointer"
            type="button"
          >
            SUBMIT EXAM
          </button>
        </div>
      </div>
    </header>
  );
}
