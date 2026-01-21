import FormField from '@/components/ui/form-field';
import React, { forwardRef, useState } from 'react';

interface TextFieldProps {
  label: string;
  value?: string | number;
  onChange?: (value: string) => void;
  error?: string;
  id?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute; // stricter type than 'string'
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      onChange,
      placeholder = 'Enter....',
      type = 'text',
      name,
      id,
      value,
      error,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [email, setEmail] = useState(value);

    return (
      <div className="relative w-full text-white font-sans text-sm font-semibold leading-8 mb-8">
        {label && (
          <label className="inline-block mb-1 text-xl" htmlFor={id}>
            {label}
          </label>
        )}

        <FormField
          ref={ref}
          type={type}
          name={name}
          id={id}
          value={email}
          placeholder={placeholder}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full rounded bg-[#222] text-white outline-none px-3 py-2  ${className}`}
          {...rest}
        />

        {error && (
          <span
            className="absolute left-0 -bottom-6 text-sm text-[#FB2C36] ms-2"
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

// Helpful for debugging in React DevTools
TextField.displayName = 'TextField';

export default TextField;
