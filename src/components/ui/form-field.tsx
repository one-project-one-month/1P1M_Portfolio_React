import { forwardRef, type InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  noFocus?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      placeholder,
      type = 'text',
      noFocus = false,
      className = '',
      error = false,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'h-12 rounded-lg px-4 py-3 w-full bg-[#FFFFFF17] border text-white transition-all duration-200';

    const borderClasses = error ? 'border-red-500' : 'border-[#FFFFFF26]';

    const placeholderClasses =
      'placeholder:font-sans placeholder:font-normal placeholder:text-sm placeholder:leading-5 placeholder:tracking-normal placeholder:text-[#6A7282]';

    const focusClasses = noFocus
      ? 'focus:outline-none focus:ring-0'
      : error
        ? 'focus:outline-none focus:ring-2 focus:ring-red-500'
        : 'focus:outline-none focus:ring-2 focus:ring-purple-500';

    return (
      <div className="w-full">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`${baseClasses} ${borderClasses} ${placeholderClasses} ${focusClasses} ${className}`}
          {...props}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  },
);

FormField.displayName = 'FormField';

export default FormField;
