"use client";

import { useState, useRef, useEffect } from "react";

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: readonly Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "選択してください",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-12 px-3 text-left border rounded-xl bg-white flex justify-between items-center ${
          isOpen ? "border-amber-400" : "border-stone-200"
        }`}
      >
        <span className={selectedLabels.length === 0 ? "text-stone-400" : "text-stone-900"}>
          {selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder}
        </span>
        <span className={`text-stone-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`w-full px-3 py-3 text-left flex items-center gap-2 transition-colors hover:bg-amber-50 ${
                  isSelected ? "bg-amber-50" : ""
                }`}
              >
                <span
                  className={`w-5 h-5 border-2 rounded-md flex items-center justify-center flex-shrink-0 ${
                    isSelected ? "bg-amber-600 border-amber-600" : "border-stone-300"
                  }`}
                >
                  {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                </span>
                <span className="text-stone-700">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
