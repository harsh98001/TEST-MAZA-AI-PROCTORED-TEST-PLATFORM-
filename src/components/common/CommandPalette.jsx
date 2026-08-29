import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckSquare,
  Code,
  Command,
  Moon,
  Search,
  Shield,
  Sun,
  Terminal,
  UserCheck,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ARENA_LANGUAGE_TRACKS } from '../../data/arena/languages';

export function CommandPalette() {
  const {
    isCommandOpen,
    setIsCommandOpen,
    setIsSearchOpen,
    setIsRoleModalOpen,
    toggleTheme,
    courses,
    theme,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const baseCommands = [
    {
      id: 'arena',
      title: 'Open The Arena (LeetCode-Style Multi-Language IDE)',
      icon: Terminal,
      category: 'ARENA',
      action: () => {
        setIsCommandOpen(false);
        navigate('/arena');
      },
    },
    ...ARENA_LANGUAGE_TRACKS.map((track) => ({
      id: `arena-${track.id}`,
      title: `Launch ${track.name} IDE Workspace (${track.version})`,
      icon: Code,
      category: 'ARENA TRACKS',
      action: () => {
        setIsCommandOpen(false);
        navigate(`/arena/${track.id}/two-sum`);
      },
    })),
    {
      id: 'search',
      title: 'Search all questions and keywords',
      icon: Search,
      category: 'NAVIGATION',
      action: () => {
        setIsCommandOpen(false);
        setIsSearchOpen(true);
      },
    },
    {
      id: 'courses',
      title: 'Browse all 14 university courses',
      icon: BookOpen,
      category: 'NAVIGATION',
      action: () => {
        setIsCommandOpen(false);
        navigate('/courses');
      },
    },
    {
      id: 'review',
      title: 'Review mistakes and step-by-step solutions',
      icon: CheckSquare,
      category: 'PRACTICE',
      action: () => {
        setIsCommandOpen(false);
        navigate('/review');
      },
    },
    {
      id: 'theme',
      title: `Toggle appearance theme (currently ${theme})`,
      icon: theme === 'dark' ? Sun : Moon,
      category: 'SYSTEM',
      action: () => {
        toggleTheme();
        setIsCommandOpen(false);
      },
    },
    {
      id: 'role',
      title: 'Switch user role (Student / Faculty / Admin)',
      icon: UserCheck,
      category: 'SYSTEM',
      action: () => {
        setIsCommandOpen(false);
        setIsRoleModalOpen(true);
      },
    },
    ...courses.map((course) => ({
      id: `exam-${course.id}`,
      title: `Start Proctored Exam: ${course.title}`,
      icon: Shield,
      category: 'EXAMS',
      action: () => {
        setIsCommandOpen(false);
        navigate(`/exam/${course.id}/phase-1`);
      },
    })),
  ];

  const filteredCommands = baseCommands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!isCommandOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, filteredCommands, selectedIndex]);

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCommandOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-surface border border-app rounded-lg shadow-2xl overflow-hidden z-10 text-main"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 border-b border-app bg-surface-raised">
              <Command size={16} className="text-[#D64545] mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command, track name, or jump to course..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-4 bg-transparent text-xs font-mono text-main placeholder:text-muted outline-none"
              />
              <span className="text-[10px] font-mono text-muted bg-surface px-2 py-1 rounded border border-app">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-app">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-muted">
                  NO COMMANDS MATCHED YOUR QUERY
                </div>
              ) : (
                filteredCommands.map((cmd, index) => {
                  const Icon = cmd.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#D64545]/15 text-[#D64545] font-semibold'
                          : 'text-secondary hover:bg-surface-raised'
                      }`}
                      type="button"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={14} className={isSelected ? 'text-[#D64545]' : 'text-muted'} />
                        <span className="text-xs font-mono tracking-wide">{cmd.title}</span>
                      </div>
                      <span className="text-[9px] font-mono tracking-mono-label text-muted uppercase">
                        {cmd.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Command Palette Footer */}
            <div className="px-4 py-2 bg-surface-raised border-t border-app flex items-center justify-between text-[10px] font-mono text-muted">
              <div className="flex items-center space-x-3">
                <span>↑↓ TO NAVIGATE</span>
                <span>↵ TO EXECUTE</span>
              </div>
              <span>COMMAND PALETTE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
