import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { HeroScene } from '../three/HeroScene';
import { MagneticButton } from '../common/MagneticButton';

export function HeroSection() {
  const { user, courses, setCursorLabel } = useApp();
  const totalMCQs = courses.reduce((acc, c) => acc + (c.questions?.length || 0), 0);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-10 pb-16 overflow-hidden hairline-b">
      {/* 3D Scene Layer */}
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full pointer-events-none z-0 opacity-85">
        <HeroScene className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Asymmetrical Editorial Typography */}
          <div className="lg:col-span-8 space-y-8">
            {/* Monospace Metadata Eyebrow */}
            <div className="flex items-center space-x-3 text-xs font-mono tracking-mono-label text-[#D64545] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#D64545]" />
              <span>TEST MAZA // SECURED PROCTORING ENGINE</span>
            </div>

            {/* Giant Clash Display Headline */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-semibold tracking-tighter-display text-main leading-[0.92] uppercase">
              Precision <br />
              Evaluation.
            </h1>

            {/* Restrained Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-secondary font-body max-w-lg leading-relaxed">
              University examination intelligence architecture. Real-time biometric proctoring telemetry, unit-wise competency modeling, and zero-latency evaluation.
            </p>

            {/* Action Row with Magnetic CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/exam/web-development/phase-1"
                onMouseEnter={() => setCursorLabel('EXAM')}
                onMouseLeave={() => setCursorLabel('')}
              >
                <MagneticButton className="px-7 py-3.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium flex items-center space-x-2 transition-all shadow-lg hover:shadow-[#D64545]/20">
                  <Shield size={14} className="text-white" />
                  <span>START PROCTORED EXAM</span>
                  <ArrowUpRight size={14} />
                </MagneticButton>
              </Link>

              <Link
                to="/courses"
                onMouseEnter={() => setCursorLabel('CATALOG')}
                onMouseLeave={() => setCursorLabel('')}
              >
                <MagneticButton className="px-6 py-3.5 rounded border border-app bg-surface hover:border-[#D64545] text-main font-mono text-xs tracking-mono-label uppercase font-medium flex items-center space-x-2 transition-all">
                  <BookOpen size={13} className="text-[#D64545]" />
                  <span>EXPLORE {courses.length} TRACKS</span>
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Metric Ticker Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 hairline-t text-xs font-mono">
          <div>
            <span className="text-[10px] text-muted tracking-mono-label uppercase block mb-1">
              QUESTION REPOSITORY
            </span>
            <strong className="text-xl sm:text-2xl text-main font-medium">{totalMCQs} MCQS</strong>
          </div>
          <div>
            <span className="text-[10px] text-muted tracking-mono-label uppercase block mb-1">
              ACTIVE CURRICULA
            </span>
            <strong className="text-xl sm:text-2xl text-main font-medium">
              {courses.length < 10 ? `0${courses.length}` : courses.length} TRACKS
            </strong>
          </div>
          <div>
            <span className="text-[10px] text-muted tracking-mono-label uppercase block mb-1">
              PROCTOR INTEGRITY
            </span>
            <strong className="text-xl sm:text-2xl text-[#10B981] font-medium">REAL-TIME AI</strong>
          </div>
          <div>
            <span className="text-[10px] text-muted tracking-mono-label uppercase block mb-1">
              LATENCY BENCHMARK
            </span>
            <strong className="text-xl sm:text-2xl text-main font-medium">&lt; 12MS</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
