type FormFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-stone-600">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
