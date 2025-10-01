import { cva } from "class-variance-authority";
import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva("rounded-lg",{
  variants:{
    variant:{
      primary: " bg-[#9C39FC] text-white opacity-100 flex items-center justify-center ",
      secondary: " opacity-100 flex items-center justify-center  bg-[#9C39FC] text-white",
      white_button: " rounded-[8px]  border border-white/15 bg-white opacity-100 flex items-center justify-center ",
      black_button: " rounded-[8px]  border border-white/15 bg-[#030712] flex items-center justify-center  text-white",
      black_small_button: " rounded-lg  border border-[#99A1AF] opacity-50 flex items-center justify-center gap-6 text-black"
    },
    size:{
      primary: "w-[404px] h-12 px-6 py-0 gap-6",
      secondary: "w-[92px] h-12 px-6 py-0 gap-6",
      white_button: "w-[275px] h-[57px] px-[16px] py-[14px] gap-[10px]",
      black_button: "w-[275px] h-[57px] px-[16px] py-[14px] gap-[10px]",
      black_small_button: "w-[94px] h-12 px-6 py-0"
    }
  }
})

function Button({ children, className = "", variant, size, ...props }) {
  return (
    <button
      className={twMerge(clsx(buttonVariants({variant, size, className})))}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
