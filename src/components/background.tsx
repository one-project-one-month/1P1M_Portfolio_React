import bg from '@/assets/image.png';
import type { ComponentProps } from 'react';

export default function Background({
  className,
  style,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={`relative h-screen w-full ${className}`}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...style,
      }}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
