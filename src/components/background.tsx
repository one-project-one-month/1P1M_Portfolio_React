import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import InterActiveParticleOverlay from './core/interactive-particle-overlay';

function generateStars(count: number, seed: number) {
  let s = seed;
  const next = () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
  return Array.from({ length: count }, () => {
    const x = Math.round(next() * 2000);
    const y = Math.round(next() * 2000);
    const opacity = 0.4 + next() * 0.6;
    return `${x}px ${y}px 0px rgba(255,255,255,${opacity.toFixed(2)})`;
  }).join(', ');
}

export default function Background({
  className,
  style,
  children,
  ...props
}: ComponentProps<'div'>) {
  const stars = useMemo(() => generateStars(2400, 42), []);

  return (
    <div
      className={`relative overflow-hidden h-screen w-full ${className}`}
      style={{
        background: `
          radial-gradient(ellipse at 15% 95%, rgba(70, 35, 80, 0.25) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 30%, rgba(20, 28, 60, 0.2) 0%, transparent 50%),
          #070b1e
        `,
        ...style,
      }}
      {...props}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          width: 1,
          height: 1,
          boxShadow: stars,
        }}
      />
      <InterActiveParticleOverlay className="absolute top-0 left-0" />
      <div className="relative z-50 h-screen w-full">{children}</div>
    </div>
  );
}
