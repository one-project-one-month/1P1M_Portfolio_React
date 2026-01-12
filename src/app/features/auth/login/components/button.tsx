import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva('rounded-lg cursor-pointer', {
  variants: {
    variant: {
      primary:
        'bg-[#9C39FC] text-white opacity-100 flex items-center justify-center hover:bg-[#8B2FE0] transition-colors',
      secondary:
        'opacity-100 flex items-center justify-center bg-[#9C39FC] text-white',
      white_button:
        'rounded-[8px] border border-white/15 bg-white opacity-100 flex items-center justify-center',
      black_button:
        'rounded-[8px] border border-white/15 bg-[#030712] flex items-center justify-center text-white',
      black_small_button:
        'rounded-lg border border-[#99A1AF] opacity-50 flex items-center justify-center gap-6 text-black',

      yellow_button:
        'bg-[#FFBA00] text-[#000000] text-sm font-sans font-semibold rounded-[8px] hover:opacity-90 transition-all duration-200',

      purple_button:
        'bg-[#6F28B3] text-white text-sm font-sans font-semibold rounded-[8px] hover:opacity-90 transition-all duration-200',
    },
    size: {
      primary: 'h-12 px-6 py-3 gap-2',
      secondary: 'w-[92px] h-12 px-6 py-0 gap-6',
      white_button: 'w-[275px] h-[57px] px-[16px] py-[14px] gap-[10px]',
      black_button: 'w-[275px] h-[57px] px-[16px] py-[14px] gap-[10px]',
      black_small_button: 'w-[94px] h-12 px-6 py-0',
      yellow_button: 'w-[102px] h-[48px] text-center leading-[48px]',
      purple_button: 'w-[82px] h-[48px] text-center leading-[48px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'primary',
  },
});

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button(props: ButtonProps) {
  const { children, className, variant, size, ...rest } = props;

  return (
    <button
      className={twMerge(clsx(buttonVariants({ variant, size }), className))}
      {...rest}
    >
      {children}
    </button>
  );
}
