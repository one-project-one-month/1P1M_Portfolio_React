import React, { forwardRef,type ChangeEvent } from "react";
import FormField from "@/components/ui/form-field";


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
      placeholder="Enter....",
      type = "text",
      name,
      id,
      value,
      error,
      className = "",
      ...rest 
    },
    ref
  ) => {
    
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className="relative w-full text-white font-sans text-sm font-semibold leading-8 mb-8">
        {label && (
          <label className="inline-block mb-1" htmlFor={id}>
            {label}
          </label>
        )}
        
        <FormField
          ref={ref}
          type={type}
          name={name}
          id={id}
          
          value={value ?? ""} 
          placeholder={placeholder}
          onChange={handleChange}
          className={`px-3 py-2 rounded bg-[#222] text-white outline-none ${className}`}
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
  }
);

// Helpful for debugging in React DevTools
TextField.displayName = "TextField";

export default TextField;
