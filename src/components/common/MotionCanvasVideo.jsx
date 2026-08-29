import { useEffect, useRef, useState } from 'react';

export function MotionCanvasVideo({
  type = 'maza-energy',
  height = 140,
  isHovered = false,
  className = '',
}) {
  const canvasRef = useRef(null);
  const [scrollSpeed, setScrollSpeed] = useState(1);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const delta = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      setScrollSpeed(Math.min(3, 1 + delta * 0.05));

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollSpeed(1);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 300);
    let heightPx = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 140);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 300;
      heightPx = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 140;
    };

    window.addEventListener('resize', resize);

    // Particle system configuration based on type
    const particles = [];
    const count = type === 'neural' ? 24 : type === 'code' ? 30 : 20;

    const colorPalettes = {
      'neural': ['#19a64a', '#ffd51f', '#f58220', '#34d399'],
      'matrix': ['#38bdf8', '#ffd51f', '#818cf8', '#f58220'],
      'code': ['#f58220', '#ffd51f', '#19a64a', '#fb923c'],
      'analytical': ['#ffd51f', '#f58220', '#f43f5e', '#a855f7'],
      'maza-energy': ['#ffd51f', '#f58220', '#19a64a', '#fff8d7'],
    };

    const palette = colorPalettes[type] || colorPalettes['maza-energy'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * heightPx,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2.5 + 1.2,
        color: palette[i % palette.length],
        alpha: Math.random() * 0.6 + 0.3,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      const speedMultiplier = (isHovered ? 2.2 : 1) * scrollSpeed;

      ctx.clearRect(0, 0, width, heightPx);

      // 1. Draw dynamic background wave
      const grad = ctx.createLinearGradient(0, 0, width, heightPx);
      grad.addColorStop(0, 'rgba(5, 16, 9, 0.7)');
      grad.addColorStop(0.5, isHovered ? 'rgba(245, 130, 32, 0.15)' : 'rgba(10, 27, 17, 0.8)');
      grad.addColorStop(1, 'rgba(4, 22, 14, 0.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, heightPx);

      // 2. Render wavy grid lines for high-tech video loop
      ctx.beginPath();
      ctx.strokeStyle = isHovered ? 'rgba(255, 213, 31, 0.25)' : 'rgba(255, 213, 31, 0.08)';
      ctx.lineWidth = 1;

      for (let y = 15; y < heightPx; y += 30) {
        ctx.moveTo(0, y);
        for (let x = 0; x < width; x += 15) {
          const wave = Math.sin(x * 0.015 + time * 1.5 + y) * (isHovered ? 8 : 4);
          ctx.lineTo(x, y + wave);
        }
      }
      ctx.stroke();

      // 3. Connect nodes if neural or matrix
      if (type === 'neural' || type === 'matrix' || isHovered) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = isHovered ? 90 * window.devicePixelRatio : 65 * window.devicePixelRatio;

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * (isHovered ? 0.45 : 0.2);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 213, 31, ${alpha})`;
              ctx.lineWidth = isHovered ? 1.5 : 0.8;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // 4. Update and render particles
      particles.forEach((p) => {
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;
        p.pulse += 0.03 * speedMultiplier;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = heightPx;
        if (p.y > heightPx) p.y = 0;

        const currentRadius = p.radius + Math.sin(p.pulse) * (isHovered ? 1.5 : 0.6);

        // Particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isHovered ? 12 : 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Ambient glowing scan line effect
      const scanY = ((Math.sin(time * 0.8) + 1) / 2) * heightPx;
      const scanGrad = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15);
      scanGrad.addColorStop(0, 'rgba(255, 213, 31, 0)');
      scanGrad.addColorStop(0.5, isHovered ? 'rgba(245, 130, 32, 0.22)' : 'rgba(255, 213, 31, 0.1)');
      scanGrad.addColorStop(1, 'rgba(255, 213, 31, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 15, width, 30);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, isHovered, scrollSpeed]);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-t-xl select-none pointer-events-none ${className}`}
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Cinematic subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1b11] via-transparent to-black/20" />
    </div>
  );
}
