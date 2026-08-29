import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, Filter, Flame, Layers, Search, Shield, Terminal, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../../components/common/PageTransition';
import { ARENA_LANGUAGE_TRACKS } from '../../data/arena/languages';
import { arenaQuestions } from '../../data/arena/arenaQuestions';
import { GitHubStreakCard } from '../../components/arena/GitHubStreakCard';
import { useApp } from '../../context/AppContext';

export function ArenaLandingPage() {
  const { setCursorLabel } = useApp();
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Solved stats stored in localStorage
  const solvedProblemIds = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('arena_solved_problems') || '[]');
    } catch {
      return [];
    }
  }, []);

  const totalQuestions = arenaQuestions.length;
  const easyCount = arenaQuestions.filter((q) => q.difficulty === 'Easy').length;
  const mediumCount = arenaQuestions.filter((q) => q.difficulty === 'Medium').length;
  const hardCount = arenaQuestions.filter((q) => q.difficulty === 'Hard').length;

  const filteredTracks = useMemo(() => {
    return ARENA_LANGUAGE_TRACKS;
  }, []);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 hairline-b pb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono tracking-mono-label text-[#D64545] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#D64545] animate-pulse" />
              <span>THE ARENA // PROFESSIONAL IDE & ALGORITHMIC PLATFORM</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-main uppercase leading-[0.95]">
              CODE ARENA.
            </h1>
            <p className="text-sm sm:text-base text-secondary font-body max-w-xl leading-relaxed">
              Multi-language LeetCode-grade algorithmic training and assessment engine. Sandboxed execution against real test suites, progressive hints, and daily GitHub commit sync.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/arena/python/two-sum"
              onMouseEnter={() => setCursorLabel('CODE')}
              onMouseLeave={() => setCursorLabel('')}
              className="px-6 py-3.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium flex items-center space-x-2 transition-all shadow-md hover:shadow-[#D64545]/20"
            >
              <Terminal size={14} />
              <span>QUICK MATCH // PYTHON</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Global Progress & GitHub Activity Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Overall Solved Matrix */}
          <div className="lg:col-span-5 p-6 rounded-lg border border-app bg-surface space-y-6 font-mono text-xs shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center hairline-b pb-4">
                <span className="text-[10px] tracking-mono-label text-[#D64545] uppercase font-medium">
                  SOLVED PROGRESSION
                </span>
                <span className="text-muted text-[11px] uppercase">
                  {solvedProblemIds.length} / {totalQuestions} SOLVED
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded border border-app bg-surface-raised space-y-1">
                  <span className="text-[9px] text-[#10B981] uppercase block">EASY</span>
                  <span className="text-lg font-medium text-main">
                    {arenaQuestions.filter(q => q.difficulty === 'Easy' && solvedProblemIds.includes(q.id)).length}/{easyCount}
                  </span>
                </div>
                <div className="p-3 rounded border border-app bg-surface-raised space-y-1">
                  <span className="text-[9px] text-[#EAB308] uppercase block">MEDIUM</span>
                  <span className="text-lg font-medium text-main">
                    {arenaQuestions.filter(q => q.difficulty === 'Medium' && solvedProblemIds.includes(q.id)).length}/{mediumCount}
                  </span>
                </div>
                <div className="p-3 rounded border border-app bg-surface-raised space-y-1">
                  <span className="text-[9px] text-[#D64545] uppercase block">HARD</span>
                  <span className="text-lg font-medium text-main">
                    {arenaQuestions.filter(q => q.difficulty === 'Hard' && solvedProblemIds.includes(q.id)).length}/{hardCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded bg-surface-raised/50 border border-app space-y-1 text-[11px] text-secondary">
              <span className="text-main font-medium block">DUAL-MODE ENGINE:</span>
              <p className="leading-relaxed">
                Use <strong className="text-main">Practice Mode</strong> for unproctored learning, or enable <strong className="text-[#D64545]">Assessment Mode</strong> for proctored examinations with video and audio integrity.
              </p>
            </div>
          </div>

          {/* Right: GitHub Habit Matrix */}
          <div className="lg:col-span-7">
            <GitHubStreakCard />
          </div>
        </div>

        {/* 7 Language Tracks Directory */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 hairline-b pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase block">
                02 / LANGUAGE RUNTIME TRACKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-main uppercase">
                CHOOSE YOUR RUNTIME
              </h2>
            </div>
            <span className="text-xs font-mono text-muted uppercase">
              7 FIRST-CLASS COMPILERS & INTERPRETERS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARENA_LANGUAGE_TRACKS.map((track) => {
              const trackQuestions = arenaQuestions.filter((q) => q.trackId === track.id);
              const firstQSlug = trackQuestions[0]?.slug || 'two-sum';

              return (
                <div
                  key={track.id}
                  className="p-6 rounded-lg border border-app bg-surface hover:border-[#D64545]/60 hover:bg-surface-raised transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-2xl">{track.icon}</span>
                        <div>
                          <h3 className="text-xl font-display font-medium text-main group-hover:text-[#D64545] transition-colors">
                            {track.name}
                          </h3>
                          <span className="text-[10px] font-mono text-muted uppercase">
                            {track.version}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-surface-raised border border-app text-[9px] font-mono text-[#D64545] uppercase tracking-mono-label">
                        {track.badge}
                      </span>
                    </div>

                    <p className="text-xs text-secondary font-body leading-relaxed line-clamp-2">
                      {track.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-app">
                    <div className="flex justify-between items-center text-[10px] font-mono text-muted uppercase">
                      <span>CHALLENGES AVAILABLE</span>
                      <strong className="text-main">{trackQuestions.length || 30}+ MCQS & IDE TASKS</strong>
                    </div>

                    <Link
                      to={`/arena/${track.id}/${firstQSlug}`}
                      onMouseEnter={() => setCursorLabel('IDE')}
                      onMouseLeave={() => setCursorLabel('')}
                      className="w-full py-2.5 px-3 rounded bg-surface-raised border border-app hover:border-[#D64545] hover:bg-[#D64545] hover:text-white text-main font-mono text-xs tracking-mono-label uppercase font-medium flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <span>LAUNCH {track.name} IDE</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
