export const DAYS_OF_WEEK = [
  { value: "monday", label: "月" },
  { value: "tuesday", label: "火" },
  { value: "wednesday", label: "水" },
  { value: "thursday", label: "木" },
  { value: "friday", label: "金" },
  { value: "saturday", label: "土" },
  { value: "sunday", label: "日" },
] as const;

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number]["value"];

export const TIME_SLOTS = [
  { value: "morning", label: "午前（9:00-13:00）" },
  { value: "afternoon", label: "午後（13:00-17:00）" },
  { value: "evening_night", label: "夕方・夜（17:00-21:00）" },
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number]["value"];

export const GENDERS = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
] as const;

export type Gender = (typeof GENDERS)[number]["value"];
