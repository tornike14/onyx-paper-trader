import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string };

const Input = forwardRef<HTMLInputElement, Props>(({ label, className, ...rest }, ref) => (
  <label className="block space-y-1.5">
    {label ? (
      <span className="text-xs uppercase tracking-wider text-text-mid">{label}</span>
    ) : null}
    <input
      ref={ref}
      className={`w-full h-11 px-3 rounded-btn bg-bg-elevated border border-border text-text-high placeholder:text-text-dim focus:outline-none focus:border-brand transition ${className ?? ""}`}
      {...rest}
    />
  </label>
));

Input.displayName = "Input";

export default Input;
