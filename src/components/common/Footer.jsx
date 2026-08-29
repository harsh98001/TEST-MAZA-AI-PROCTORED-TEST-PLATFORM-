import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full hairline-t bg-surface text-secondary pt-16 pb-14 mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 hairline-b">
          {/* Brand & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-baseline space-x-2">
              <span className="font-display text-2xl font-bold text-main">
                TEST MAZA
              </span>
              <span className="text-[10px] font-mono text-muted tracking-mono-label uppercase">
                [ SPATIAL EDITION ]
              </span>
            </div>
            <p className="text-sm text-secondary font-body max-w-sm leading-relaxed">
              Award-grade university examination and proctoring platform. Powered by React Three Fiber, GSAP spatial animation, and zero-latency competency analytics.
            </p>
          </div>

          {/* Curricula Sitemap */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-muted tracking-mono-label uppercase block mb-3 font-medium">
              CURRICULA
            </span>
            <ul className="space-y-2">
              <li>
                <Link to="/practice/machine-learning-python/phase-1" className="hover:text-[#D64545] transition-colors">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/practice/discrete-computational-math/phase-1" className="hover:text-[#D64545] transition-colors">
                  Discrete Math
                </Link>
              </li>
              <li>
                <Link to="/practice/php/phase-1" className="hover:text-[#D64545] transition-colors">
                  PHP Backend
                </Link>
              </li>
              <li>
                <Link to="/practice/analytical-skills-2/phase-1" className="hover:text-[#D64545] transition-colors">
                  Analytical Skills
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Sitemap */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-muted tracking-mono-label uppercase block mb-3 font-medium">
              PLATFORM
            </span>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="hover:text-[#D64545] transition-colors">
                  Track Catalog
                </Link>
              </li>
              <li>
                <Link to="/exam/machine-learning-python/phase-1" className="hover:text-[#D64545] transition-colors">
                  AI Proctor HUD
                </Link>
              </li>
              <li>
                <Link to="/review" className="hover:text-[#D64545] transition-colors">
                  Solution Keys
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-[#D64545] transition-colors">
                  Settings & Auth
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Proctoring Status */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-muted tracking-mono-label uppercase block mb-3 font-medium">
              SYSTEM INTEGRITY
            </span>
            <div className="p-4 rounded border border-app bg-surface-raised space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-main font-medium">PROCTOR WATCHDOG: ARMED</span>
              </div>
              <p className="text-[11px] text-muted leading-relaxed">
                Continuous webcam telemetry, acoustic dB measurement, and anti-clipboard enforcement active.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Baseline */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-muted gap-4">
          <span>© {new Date().getFullYear()} TEST MAZA. ARCHITECTED FOR RIGOROUS EVALUATION.</span>
          <span className="tracking-mono-label text-secondary uppercase">
            R3F • GSAP SCROLLTRIGGER • SUPABASE AUTH
          </span>
        </div>
      </div>
    </footer>
  );
}
