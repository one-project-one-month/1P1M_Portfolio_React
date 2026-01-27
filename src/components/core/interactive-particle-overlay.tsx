import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

type InterActiveParticleOverlayProps = {
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  ox: number; // original x
  oy: number; // original y
  vx: number;
  vy: number;
  size: number;
  color: string;
};

function InterActiveParticleOverlay({
  className,
}: InterActiveParticleOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // resize canvas to full window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // mouse tracking
    const mouse = { x: -1000, y: -1000, radius: 200 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // particle setup
    const colors = ['rgb(255, 255, 255)', 'rgba(255, 255, 255, 0.5)'];
    const particles: Particle[] = Array.from({ length: 300 }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        ox: x,
        oy: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 0.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    let animationId: number;

    const loop = () => {
      // clear canvas for transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // distance to mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          // repel
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.2;
          p.vy += Math.sin(angle) * force * 0.2;
        } else if (distance > mouse.radius) {
          // spring back to original position
          p.vx += (p.ox - p.x) * 0.001;
          p.vy += (p.oy - p.y) * 0.001;
        }

        // movement
        p.x += p.vx;
        p.y += p.vy;

        // damping
        p.vx *= 0.92;
        p.vy *= 0.92;

        // wrap edges
        // if (p.x < 0) p.x = canvas.width;
        // if (p.x > canvas.width) p.x = 0;
        // if (p.y < 0) p.y = canvas.height;
        // if (p.y > canvas.height) p.y = 0;

        // draw
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 1);
        ctx.fill();
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={cn('fixed inset-0 z-10 pointer-events-none', className)}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default InterActiveParticleOverlay;
