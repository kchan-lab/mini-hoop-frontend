import { z } from "zod";
import { DAYS_OF_WEEK, TIME_SLOTS, GENDERS, DayOfWeek, TimeSlot } from "@/constants/parentProfile";

const dayValues = DAYS_OF_WEEK.map((d) => d.value) as [DayOfWeek, ...DayOfWeek[]];
const timeSlotValues = TIME_SLOTS.map((t) => t.value) as [TimeSlot, ...TimeSlot[]];
const genderValues = GENDERS.map((g) => g.value) as [string, ...string[]];

const childSchema = z.object({
  lastName: z.string().min(1, "姓を入力してください"),
  firstName: z.string().min(1, "名を入力してください"),
  birthDate: z.string().min(1, "生年月日を選択してください"),
  gender: z.enum(genderValues, { message: "性別を選択してください" }),
  availableDays: z
    .array(z.enum(dayValues))
    .min(1, "参加可能な曜日を1つ以上選択してください"),
  availableTimeSlots: z
    .array(z.enum(timeSlotValues))
    .min(1, "参加可能な時間帯を1つ以上選択してください"),
});

export const parentProfileSchema = z.object({
  parentLastName: z.string().min(1, "姓を入力してください"),
  parentFirstName: z.string().min(1, "名を入力してください"),
  children: z.array(childSchema).min(1, "お子様情報を1人以上登録してください"),
});

// バリデーション後の型（API送信時）
export type ParentProfileFormData = z.infer<typeof parentProfileSchema>;

// フォーム入力用の型（未選択状態を許可）
export type ChildFormInput = {
  lastName: string;
  firstName: string;
  birthDate: string;
  gender: string;
  availableDays: DayOfWeek[];
  availableTimeSlots: TimeSlot[];
};

export type ParentProfileInput = {
  parentLastName: string;
  parentFirstName: string;
  children: ChildFormInput[];
};
