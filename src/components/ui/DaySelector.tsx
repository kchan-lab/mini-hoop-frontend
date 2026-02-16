"use client";

import { DAYS_OF_WEEK, DayOfWeek } from "@/constants/parentProfile";

type DaySelectorProps = {
  value: DayOfWeek[];
  onChange: (days: DayOfWeek[]) => void;
};

export function DaySelector({ value, onChange }: DaySelectorProps) {
  const toggleDay = (day: DayOfWeek) => {
    if (value.includes(day)) {
      onChange(value.filter((d) => d !== day));
    } else {
      onChange([...value, day]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {DAYS_OF_WEEK.map((day) => {
        const isSelected = value.includes(day.value);
        return (
          <label
            key={day.value}
            className={`flex items-center justify-center w-11 h-11 rounded-xl border-2 cursor-pointer transition-all ${
              isSelected
                ? "bg-amber-600 border-amber-600 text-white shadow-sm scale-105"
                : "border-stone-200 text-stone-600 hover:border-amber-300 hover:bg-amber-50"
            }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={isSelected}
              onChange={() => toggleDay(day.value)}
            />
            <span className="text-sm font-medium">{day.label}</span>
          </label>
        );
      })}
    </div>
  );
}
