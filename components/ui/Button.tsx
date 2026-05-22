import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const styles = {
  primary:
    "bg-brand text-white hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed",
  secondary:
    "bg-bg-elevated text-text-high border border-border hover:border-border-strong",
  ghost: "text-text-mid hover:text-text-high",
};

const Button = ({ variant = "primary", className, ...rest }: Props) => (
  <button
    className={`h-11 px-4 rounded-btn font-medium text-sm transition ${styles[variant]} ${className ?? ""}`}
    {...rest}
  />
);

export default Button;
