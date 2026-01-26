import { forwardRef } from 'react';
import FormField from './form-field';
import type { TextFieldProps } from './forward-text-field';

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // This ensures that even if you use Refs,
      // an onChange prop will still work if provided.
      if (onChange) {
        onChange(e.target.value);
      }
    };

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
          /* FIX: If value is provided, it's controlled. 
             If not, it allows the Ref to handle the internal state.
          */
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={`w-full rounded bg-[#222] text-white outline-none px-3 py-2 ${className}`}
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

export default TextField;
