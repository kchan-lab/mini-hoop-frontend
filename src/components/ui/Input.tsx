import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full h-12 px-3 border rounded-xl bg-white ${
          hasError ? "border-red-500" : "border-stone-200"
        } ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
