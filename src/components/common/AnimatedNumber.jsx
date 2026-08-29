import { useEffect, useState } from 'react';

export function AnimatedNumber({ value = 0, duration = 800, suffix = '', prefix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = displayValue;
    const endValue = typeof value === 'number' ? value : parseInt(value, 10) || 0;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (endValue - startValue) * easedProgress);
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }, [value, duration]);

  const formatted = displayValue < 10 && displayValue >= 0 ? `0${displayValue}` : `${displayValue}`;

  return (
    <span className="tabular-nums font-mono">
      {prefix}{formatted}{suffix}
    </span>
  );
}
