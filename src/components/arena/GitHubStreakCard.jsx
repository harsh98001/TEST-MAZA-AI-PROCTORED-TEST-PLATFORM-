import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Flame, GitCommit, GitBranch, Link2, Sparkles } from 'lucide-react';

function GithubIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function GitHubStreakCard() {
  const [username, setUsername] = useState('developer');
  const [isConnected, setIsConnected] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  // Generate realistic contribution heatmap matrix (32 weeks x 7 days)
  const heatmapData = useMemo(() => {
    const weeks = [];
    for (let w = 0; w < 32; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const r = Math.random();
        const intensity = r > 0.65 ? Math.floor(Math.random() * 3) + 1 : (r > 0.4 ? 1 : 0);
        days.push(intensity);
      }
      weeks.push(days);
    }
    return weeks;
  }, []);

  const totalCommits = 418;
  const currentStreak = 14;

  return (
    <div className="p-6 rounded-lg border border-app bg-surface space-y-6 font-mono text-xs shadow-sm">
      {/* Top Identity Row */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 hairline-b pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-[#D64545]/10 border border-[#D64545]/30 flex items-center justify-center text-[#D64545]">
            <GithubIcon size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-main font-medium text-sm">@{username}</span>
              <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[9px] uppercase tracking-mono-label">
                SYNCED
              </span>
            </div>
            <span className="text-[10px] text-muted uppercase">GITHUB HABIT TELEMETRY</span>
          </div>
        </div>

        {/* Streaks Ticker */}
        <div className="flex items-center space-x-6 text-[11px]">
          <div>
            <span className="text-muted text-[9px] uppercase block">CURRENT STREAK</span>
            <div className="flex items-center space-x-1.5 text-[#D64545] font-medium text-sm">
              <Flame size={14} className="animate-pulse" />
              <span>{currentStreak} DAYS</span>
            </div>
          </div>
          <div>
            <span className="text-muted text-[9px] uppercase block">YEARLY COMMITS</span>
            <span className="text-main font-medium text-sm">{totalCommits}</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] text-muted uppercase tracking-mono-label">
          <span>DAILY CODING ACTIVITY MATRIX</span>
          <div className="flex items-center space-x-1 text-[9px]">
            <span>LESS</span>
            <div className="w-2 h-2 rounded-xs bg-[#1a1a1a]" />
            <div className="w-2 h-2 rounded-xs bg-[#D64545]/30" />
            <div className="w-2 h-2 rounded-xs bg-[#D64545]/60" />
            <div className="w-2 h-2 rounded-xs bg-[#D64545]" />
            <span>MORE</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1 min-w-[500px]">
            {heatmapData.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((level, dIdx) => {
                  const bgClass =
                    level === 3
                      ? 'bg-[#D64545]'
                      : level === 2
                      ? 'bg-[#D64545]/60'
                      : level === 1
                      ? 'bg-[#D64545]/30'
                      : 'bg-surface-raised';
                  return (
                    <div
                      key={dIdx}
                      className={`w-2.5 h-2.5 rounded-xs ${bgClass} transition-colors hover:ring-1 hover:ring-white/40 cursor-pointer`}
                      title={`Activity recorded`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-commit repo sync opt-in */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pt-4 border-t border-app">
        <div className="flex items-center space-x-2.5">
          <GitCommit size={14} className="text-[#D64545] shrink-0" />
          <span className="text-secondary text-[11px]">
            Auto-push accepted solutions to <code className="text-main bg-surface-raised px-1.5 py-0.5 rounded border border-app">arena-solutions</code>
          </span>
        </div>

        <button
          onClick={() => setAutoSync(!autoSync)}
          className={`px-3 py-1.5 rounded border transition-all flex items-center space-x-1.5 cursor-pointer ${
            autoSync
              ? 'border-[#10B981]/50 bg-[#10B981]/10 text-[#10B981]'
              : 'border-app bg-surface-raised text-muted'
          }`}
          type="button"
        >
          {autoSync && <Check size={11} />}
          <span className="text-[10px] uppercase font-medium">{autoSync ? 'ENABLED' : 'DISABLED'}</span>
        </button>
      </div>
    </div>
  );
}
