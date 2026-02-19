import bg from '@/assets/image.png';
import type { ComponentProps } from 'react';
import InterActiveParticleOverlay from './core/interactive-particle-overlay';

export default function Background({
  className,
  style,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={`relative overflow-hidden h-screen w-full ${className}`}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...style,
      }}
      {...props}
    >
      <InterActiveParticleOverlay className="absolute top-0 left-0" />
      <div className="relative z-50 h-screen w-full">{children}</div>
    </div>
  );
}
