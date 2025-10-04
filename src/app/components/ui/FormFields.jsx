import React from "react";

function FormField({ placeholder, type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`
        h-12 rounded-lg px-4 py-3
        bg-[#FFFFFF17] border border-[#FFFFFF26] 
        text-white 
        placeholder:font-sans placeholder:font-normal placeholder:text-sm placeholder:leading-5 
        placeholder:tracking-normal placeholder:align-middle placeholder:text-[#6A7282]
        focus:outline-none focus:ring-2 focus:ring-purple-500
        ${className}
      `}
      {...props}
    />
  );
}

export default FormField;
