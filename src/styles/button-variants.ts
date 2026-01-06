import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'rounded-lg cursor-pointer transition-all duration-200 inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        primary: 'bg-[#9C39FC] text-white hover:bg-[#8B2FE0]',
        secondary: 'bg-[#9C39FC] text-white',
        white_button:
          'rounded-[8px] border border-white/15 bg-white text-black',
        black_button:
          'rounded-[8px] border border-white/15 bg-[#030712] text-white',
        black_small_button:
          'rounded-lg border border-[#99A1AF] opacity-50 gap-6 text-black',
        yellow_button:
          'bg-[#FFBA00] text-[#000000] text-sm font-sans font-semibold rounded-[8px] hover:opacity-90',
        purple_button:
          'bg-[#6F28B3] text-white text-sm font-sans font-semibold rounded-[8px] hover:opacity-90',
      },
      size: {
        primary: 'h-12 px-6 py-3 gap-2',
        secondary: 'w-[92px] h-12 px-6',
        white_button: 'w-[275px] h-[57px] px-[16px] py-[14px]',
        black_button: 'w-[275px] h-[57px] px-[16px] py-[14px]',
        black_small_button: 'w-[94px] h-12 px-6',
        yellow_button: 'w-[102px] h-[48px]',
        purple_button: 'w-[82px] h-[48px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'primary',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
