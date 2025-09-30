import React from "react";

function FormField({ placeholder, type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`
        w-[449px] h-12 rounded-lg px-4 py-3
        bg-[#FFFFFF17] border border-[#FFFFFF26] 
        text-whit placeholder-[#99A1AF]
        focus:outline-none focus:ring-2 focus:ring-purple-500
        ${className}
      `}
      {...props}
    />
  );
}

export default FormField;
