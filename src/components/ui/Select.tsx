import { forwardRef } from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, options, placeholder = "選択してください", className = "", ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full h-12 px-3 border rounded-xl bg-white ${
          hasError ? "border-red-500" : "border-stone-200"
        } ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";
