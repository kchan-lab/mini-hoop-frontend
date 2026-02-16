import type { DayOfWeek, Gender, TimeSlot } from "@/constants/parentProfile";

export type Child = {
  lastName: string;
  firstName: string;
  birthDate: string;
  gender: Gender;
  availableDays: DayOfWeek[];
  availableTimeSlots: TimeSlot[];
};

export type ParentProfile = {
  parentLastName: string;
  parentFirstName: string;
  children: Child[];
};
