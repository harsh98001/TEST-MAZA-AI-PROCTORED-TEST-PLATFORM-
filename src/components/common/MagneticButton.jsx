import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function MagneticButton({ children, className = '', strength = 0.25, ...props }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(button, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      xTo(deltaX);
      yTo(deltaY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <button ref={buttonRef} className={`will-change-transform ${className}`} {...props}>
      {children}
    </button>
  );
}
