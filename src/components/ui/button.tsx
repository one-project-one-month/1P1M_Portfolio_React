import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonVariants } from '@/styles/button-variants';
import type { ComponentProps } from 'react';

function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ComponentProps<'button'> & ButtonVariants) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
