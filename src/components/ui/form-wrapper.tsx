import { Button } from '@/components/ui/button';
import type { FormEvent, ReactNode } from 'react';

export interface FormWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  buttonText?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> | void;
}

export default function FormWrapper(props: FormWrapperProps) {
  const {
    title,
    subtitle,
    children,
    onSubmit,
    className = '',
    loading = false,
    buttonText = 'Continue',
  } = props;

  async function handleButtonClick(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    console.log('=== BUTTON CLICKED - CALLING API ===');
    await onSubmit(e as unknown as FormEvent<HTMLFormElement>);
  }

  return (
    <form
      className={`text-white font-sans text-sm font-semibold leading-8 ${className}`}
    >
      <div className="text-2xl text-center space-y-2">
        <h2 className="text-2xl">{title}</h2>
        {subtitle && <p className="text-sm text-[#99A1AF]">{subtitle}</p>}
      </div>

      {children}

      <Button
        type="submit"
        className="w-full cursor-pointer"
        variant="primary"
        size="primary"
        disabled={loading}
        onClick={handleButtonClick}
      >
        <div className="flex items-center justify-center">
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {buttonText}
        </div>
      </Button>
    </form>
  );
}
