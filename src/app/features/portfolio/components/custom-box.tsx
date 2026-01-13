import React, {type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming you use the standard shadcn utility for merging classes

interface CustomBoxProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}


const CustomBox: React.FC<CustomBoxProps> = ({ 
  children, 
  style = {}, 
  className = "" 
}) => {
  return (
    <div
      
      className={cn(

        "flex flex-col rounded-3xl rounded-lg bg-[#FFFFFF17] border border-[#FFFFFF26] p-[13px_20px] gap-3",
        "w-full max-w-[628px] h-[150px] overflow-auto opacity-100",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default CustomBox;