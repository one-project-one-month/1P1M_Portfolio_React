import { forwardRef } from "react";

const PaginationBtn = forwardRef(
  ({ className = "", children, disabled = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`font-bold p-2 w-10 h-10 rounded-[8px] border border-white/15 
                    bg-[#FFFFFF17] text-white cursor-pointer 
                    flex items-center justify-center 
                    disabled:cursor-not-allowed disabled:opacity-50
                    hover:bg-[#9C39FC33] 
                    ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default PaginationBtn;
