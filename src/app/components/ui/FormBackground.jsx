import React from "react";

function FormBackground({ children, className = "", style = {}, ...props }) {
  return (
    <div
      className={`bg-[#030712] rounded-3xl w-[420px] p-8 flex flex-col ${className}`}
      style={{ opacity: 1, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export default FormBackground;
