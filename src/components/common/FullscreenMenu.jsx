import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Clock, Code, ShieldCheck, Terminal, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MENU_ITEMS = [
  {
    number: '01',
    title: 'CURRICULA',
    desc: 'Explore 14 comprehensive university syllabi, units, and curriculum tracks.',
    path: '/courses',
  },
  {
    number: '02',
    title: 'THE ARENA',
    desc: 'LeetCode-style multi-language IDE workspace with sandboxed test runners and GitHub sync.',
    path: '/arena',
  },
  {
    number: '03',
    title: 'PRACTICE',
    desc: 'Instant answer feedback, unit-wise filters, and phase-by-phase learning.',
    path: '/practice/web-development/phase-1',
  },
  {
    number: '04',
    title: 'EXAM PROCTOR',
    desc: 'Strict proctored examination simulation with camera, audio, and violation tracking.',
    path: '/exam/web-development/phase-1',
  },
  {
    number: '05',
    title: 'PERFORMANCE',
    desc: 'Longitudinal analytics, readiness scores, and competency modeling telemetry.',
    path: '/performance',
  },
  {
    number: '06',
    title: 'SOLUTIONS',
    desc: 'Deep mistake post-mortem with detailed academic step-by-step solutions.',
    path: '/review',
  },
  {
    number: '07',
    title: 'SETTINGS',
    desc: 'Customize proctoring sensitivities, themes, audio, and session preferences.',
    path: '/settings',
  },
];

export function FullscreenMenu() {
  const { isMenuOpen, setIsMenuOpen, setCursorLabel } = useApp();

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-y-auto text-main transition-colors"
        >
          {/* Top Bar inside Menu */}
          <div className="flex justify-between items-center hairline-b pb-6">
            <div className="flex items-center space-x-3">
              <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase font-medium">
                INDEX DIRECTORY
              </span>
              <span className="text-[10px] font-mono text-muted">
                // 07 PRIMARY CHANNELS
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 text-xs font-mono text-secondary hover:text-main border border-app bg-surface-raised px-3.5 py-2 rounded transition-all shadow-xs cursor-pointer"
              type="button"
            >
              <X size={14} />
              <span>CLOSE [ESC]</span>
            </button>
          </div>

          {/* Center Navigation Links */}
          <div className="py-8 md:py-12 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 lg:gap-y-10">
              {MENU_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={() => setCursorLabel('OPEN')}
                    onMouseLeave={() => setCursorLabel('')}
                    className="group flex flex-col hairline-b pb-4 transition-all"
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline space-x-4">
                        <span className="text-xs font-mono text-[#D64545] font-medium">
                          {item.number}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-medium text-main group-hover:text-[#D64545] group-hover:translate-x-2 transition-transform duration-300">
                          {item.title}
                        </h2>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-muted group-hover:text-[#D64545] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                      />
                    </div>
                    <p className="text-xs text-secondary mt-2 pl-8 font-body max-w-sm">
                      {item.desc}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="hairline-t pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] font-mono text-muted gap-4">
            <div className="flex items-center space-x-6">
              <span>TEST MAZA 3.0</span>
              <span>THE ARENA ENGINE</span>
            </div>
            <div className="flex items-center space-x-6 text-secondary">
              <Link
                to="/faculty"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#D64545] transition-colors"
              >
                FACULTY PORTAL →
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#D64545] transition-colors"
              >
                ADMIN CONSOLE →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
