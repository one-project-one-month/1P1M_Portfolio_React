import React, { forwardRef, useState, useEffect } from "react";
import FormField from "./FormFields";

const TextField = forwardRef(
  (
    {
      label,
      onChange,
      placeholder,
      type = "text",
      name,
      id,
      value: propValue,
      error,
      className = "",
    },
    ref
  ) => {
    const [value, setValue] = useState(propValue || "");

    // Update internal state when prop value changes (for form reset)
    useEffect(() => {
      setValue(propValue || "");
    }, [propValue]);

    const handleChange = (e) => {
      setValue(e.target.value);
      if (onChange) onChange(e.target.value);
    };

    return (
      <div className="relative w-full text-white font-sans text-sm font-semibold leading-8 mb-8">
        <label className="inline-block mb-1" htmlFor={id}>
          {label}
        </label>
        <FormField
          ref={ref}
          type={type}
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={`w-full px-3 py-2 rounded bg-[#222] text-white outline-none ${className}`}
        />
        {error && (
          <span className="absolute left-0 -bottom-6 text-sm text-[#FB2C36] ms-2">
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default TextField;
