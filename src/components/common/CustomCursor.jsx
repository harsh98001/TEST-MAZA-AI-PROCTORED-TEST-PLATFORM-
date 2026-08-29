import { useEffect, useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export function CustomCursor() {
  const { settings, cursorLabel } = useApp();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const ringPos = useRef({ x: -100, y: -100 });
  const [ringDisplay, setRingDisplay] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!settings.enableCustomCursor) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive = target?.closest('a, button, input, [role="button"], select, textarea');
      setIsHovered(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.enableCustomCursor]);

  // Smooth lerp for trailing ring
  useEffect(() => {
    if (!settings.enableCustomCursor) return;

    let frameId;
    const animateRing = () => {
      ringPos.current.x += (pos.x - ringPos.current.x) * 0.2;
      ringPos.current.y += (pos.y - ringPos.current.y) * 0.2;
      setRingDisplay({ x: ringPos.current.x, y: ringPos.current.y });
      frameId = requestAnimationFrame(animateRing);
    };

    frameId = requestAnimationFrame(animateRing);
    return () => cancelAnimationFrame(frameId);
  }, [pos, settings.enableCustomCursor]);

  if (!settings.enableCustomCursor) return null;

  return (
    <>
      {/* Center Precision Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D64545] pointer-events-none z-50 transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
        }}
      />

      {/* Trailing Inverted Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 border border-white/40 mix-blend-difference transition-all duration-200 flex items-center justify-center ${
          isHovered ? 'w-10 h-10 -ml-5 -mt-5 scale-125 border-[#D64545]' : 'w-6 h-6 -ml-3 -mt-3 scale-100'
        }`}
        style={{
          transform: `translate3d(${ringDisplay.x}px, ${ringDisplay.y}px, 0)`,
        }}
      >
        {cursorLabel && (
          <span className="text-[8px] font-mono text-white tracking-widest uppercase font-bold">
            {cursorLabel}
          </span>
        )}
      </div>
    </>
  );
}
