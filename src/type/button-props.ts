import type { ButtonVariants } from "@/styles/button-variant-style";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  children?: React.ReactNode;
}
