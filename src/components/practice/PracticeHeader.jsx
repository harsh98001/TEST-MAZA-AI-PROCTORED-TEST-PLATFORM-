import { ArrowLeft, Clock, Eye, Filter, RotateCcw, Shield, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { formatDuration } from '../../utils/formatters';

export function PracticeHeader({
  courseTitle,
  phaseTitle,
  elapsedTime,
  unitFilter,
  units = [],
  onUnitChange,
  isFocusMode,
  onToggleFocus,
  onReset,
}) {
  const { theme, toggleTheme } = useApp();

  return (
    <header className="w-full border-b border-app bg-surface/90 backdrop-blur-md py-3 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
        {/* Left: Back & Breadcrumb */}
        <div className="flex items-center space-x-3">
          <Link
            to="/courses"
            className="p-2 rounded-lg border border-app bg-surface-raised text-secondary hover:text-main transition-colors shadow-xs"
            title="Exit Practice"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="text-[10px] font-mono text-[#10B981] uppercase tracking-wider font-bold">
              {courseTitle} // {phaseTitle}
            </div>
            <h2 className="text-sm font-bold text-main hidden sm:block">
              PRACTICE ARENA
            </h2>
          </div>
        </div>

        {/* Center: Live Timer */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-app bg-surface-raised text-xs font-mono font-bold text-main shadow-xs">
          <Clock size={14} className="text-[#10B981]" />
          <span>{formatDuration(elapsedTime)}</span>
        </div>

        {/* Right: Unit Filter & Theme & Focus Mode */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Unit Filter Select */}
          {units.length > 1 && (
            <div className="flex items-center space-x-1">
              <Filter size={13} className="text-muted hidden sm:inline" />
              <select
                value={unitFilter}
                onChange={(e) => onUnitChange(e.target.value)}
                className="bg-surface-raised border border-app rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-main outline-none cursor-pointer hover:border-[#10B981]/50 shadow-xs"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-app bg-surface-raised text-secondary hover:text-main transition-colors shadow-xs"
            title="Toggle theme"
            type="button"
          >
            {theme === 'dark' ? (
              <Sun size={14} className="text-[#f59e0b]" />
            ) : (
              <Moon size={14} className="text-[#0f172a]" />
            )}
          </button>

          {/* Reset button */}
          <button
            onClick={onReset}
            className="p-2 rounded-lg border border-app bg-surface-raised text-secondary hover:text-main transition-colors shadow-xs"
            title="Reset Answers"
            type="button"
          >
            <RotateCcw size={14} />
          </button>

          {/* Focus Mode Toggle */}
          <button
            onClick={onToggleFocus}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all shadow-xs ${
              isFocusMode
                ? 'border-[#10B981] bg-[#10B981]/15 text-[#10B981]'
                : 'border-app bg-surface-raised text-secondary hover:text-main'
            }`}
            type="button"
          >
            <Eye size={13} />
            <span className="hidden sm:inline">FOCUS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
