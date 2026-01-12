import React, { forwardRef } from 'react';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  noFocus?: boolean;
}

function FormField(
  props: FormFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    placeholder,
    type = 'text',
    noFocus = false,
    className = '',
    ...rest
  } = props;

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={`
        h-12 rounded-lg px-4 py-3
        bg-[#FFFFFF17] border border-[#FFFFFF26] 
        text-white 
        placeholder:font-sans placeholder:font-normal placeholder:text-sm placeholder:leading-5 
        placeholder:tracking-normal placeholder:align-middle placeholder:text-[#6A7282]
        ${
          noFocus
            ? 'focus:outline-none focus:ring-0'
            : 'focus:outline-none focus:ring-2 focus:ring-purple-500'
        }
        ${className}
      `}
      {...rest}
    />
  );
}

const InputField = forwardRef(FormField);
InputField.displayName = 'InputField';

export default InputField;
