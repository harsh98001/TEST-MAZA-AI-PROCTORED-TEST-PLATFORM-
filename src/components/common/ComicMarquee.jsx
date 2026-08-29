import { Flame, Rocket, Shield, Sparkles, Zap } from 'lucide-react';

export function ComicMarquee({ reverse = false, className = '' }) {
  const items = [
    { icon: Rocket, text: 'MISSION TO MARS: 99.99% ACCURACY' },
    { icon: Shield, text: 'AI WEBCAM & AUDIO PROCTOR ARMED' },
    { icon: Zap, text: 'LENIS SMOOTH SCROLL ACCELERATED' },
    { icon: Flame, text: '476 CERTIFIED UNIVERSITY MCQS' },
    { icon: Sparkles, text: 'SINGLE-CLICK INSTANT FEEDBACK' },
    { icon: Rocket, text: 'EPISODIC PHASE PROGRESSION' },
  ];

  return (
    <div className={`w-full overflow-hidden py-3 border-y-2 border-app bg-[#ffd51f] text-black select-none ${className}`}>
      <div className={`marquee-track flex items-center space-x-8 font-disp text-xs sm:text-sm uppercase tracking-wider font-bold ${reverse ? 'flex-row-reverse' : ''}`}>
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center space-x-3 shrink-0">
              <Icon size={16} className="text-[#ef3f28]" />
              <span>{item.text}</span>
              <span className="text-[#f58220] text-base">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
