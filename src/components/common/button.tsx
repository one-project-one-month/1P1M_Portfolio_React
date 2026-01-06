import React from "react";
import { buttonVariants, cn } from "@/styles/button-variant-style";
import type { ButtonProps } from "@/types/button-props";


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);


export default Button;