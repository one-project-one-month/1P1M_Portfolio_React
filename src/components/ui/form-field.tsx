import React, { type InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  noFocus?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

const FormField = ({
  placeholder,
  type = 'text',
  noFocus = false,
  ref,
  className = '',
  ...props
}: FormFieldProps) => {
  const baseClasses =
    'h-12 rounded-lg px-4 py-3 bg-[#FFFFFF17] border border-[#FFFFFF26] text-white transition-all duration-200';
  const placeholderClasses =
    'placeholder:font-sans placeholder:font-normal placeholder:text-sm placeholder:leading-5 placeholder:tracking-normal placeholder:text-[#6A7282]';
  const focusClasses = noFocus
    ? 'focus:outline-none focus:ring-0'
    : 'focus:outline-none focus:ring-2 focus:ring-purple-500';

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={`${baseClasses} ${placeholderClasses} ${focusClasses} ${className}`}
      {...props}
    />
  );
};

export default FormField;
