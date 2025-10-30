import React from "react";

function CustomBox({ children, style={}, className = "" }) {
  return (
    <div
    className={className}
      style={{
        width: "628px",
        height: "150px",
        borderRadius: "0.5rem", // radius/lg
        padding: "13px 20px",
        gap: "12px",
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF17",
        border: "1px solid #FFFFFF26",
        opacity: 1,
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default CustomBox;
