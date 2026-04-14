"use client";

import { useForm, FormProvider, useFieldArray, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parentProfileSchema, ParentProfileInput, ChildFormInput } from "@/features/parents/schemas/parentProfile";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DaySelector } from "@/components/ui/DaySelector";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { GENDERS, TIME_SLOTS, DayOfWeek, TimeSlot } from "@/constants/parentProfile";
import { User, Users, Plus, Trash2 } from "lucide-react";

const createDefaultChild = (): ChildFormInput => ({
  lastName: "",
  firstName: "",
  birthDate: "",
  gender: "",
  availableDays: [],
  availableTimeSlots: [],
});

function ChildSection({ index, onRemove, canRemove }: {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<ParentProfileInput>();

  const childErrors = errors.children?.[index];
  const availableDays = watch(`children.${index}.availableDays`) || [];
  const availableTimeSlots = watch(`children.${index}.availableTimeSlots`) || [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-amber-700 rounded-lg flex items-center justify-center text-white text-sm font-medium">
            {index + 1}
          </div>
          <h3 className="font-medium text-stone-700">お子様 {index + 1}</h3>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="姓" required error={childErrors?.lastName?.message}>
            <Input
              {...register(`children.${index}.lastName`)}
              hasError={!!childErrors?.lastName}
              placeholder="山田"
            />
          </FormField>
          <FormField label="名" required error={childErrors?.firstName?.message}>
            <Input
              {...register(`children.${index}.firstName`)}
              hasError={!!childErrors?.firstName}
              placeholder="花子"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="生年月日" required error={childErrors?.birthDate?.message}>
            <Input
              type="date"
              {...register(`children.${index}.birthDate`)}
              hasError={!!childErrors?.birthDate}
            />
          </FormField>
          <FormField label="性別" required error={childErrors?.gender?.message}>
            <Select
              {...register(`children.${index}.gender`)}
              hasError={!!childErrors?.gender}
              options={GENDERS}
            />
          </FormField>
        </div>

        <FormField label="参加可能曜日（複数選択可）" error={childErrors?.availableDays?.message}>
          <DaySelector
            value={availableDays}
            onChange={(days: DayOfWeek[]) => setValue(`children.${index}.availableDays`, days)}
          />
        </FormField>

        <FormField label="参加可能時間帯（複数選択可）" error={childErrors?.availableTimeSlots?.message}>
          <MultiSelect
            options={TIME_SLOTS}
            value={availableTimeSlots}
            onChange={(slots: string[]) =>
              setValue(`children.${index}.availableTimeSlots`, slots as TimeSlot[])
            }
            placeholder="選択してください"
          />
        </FormField>
      </div>
    </div>
  );
}

export function ParentRegisterForm() {
  const methods = useForm<ParentProfileInput>({
    resolver: zodResolver(parentProfileSchema),
    defaultValues: {
      parentLastName: "",
      parentFirstName: "",
      children: [createDefaultChild()],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const onSubmit = async (data: ParentProfileInput) => {
    // TODO: API連携時に実装
    console.log("送信データ:", data);
    alert("登録が完了しました（仮）");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 保護者情報 */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200/60 p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-amber-700" />
            </div>
            <h2 className="font-medium text-amber-700">保護者情報</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="姓" required error={errors.parentLastName?.message}>
              <Input
                {...register("parentLastName")}
                hasError={!!errors.parentLastName}
                placeholder="山田"
              />
            </FormField>
            <FormField label="名" required error={errors.parentFirstName?.message}>
              <Input
                {...register("parentFirstName")}
                hasError={!!errors.parentFirstName}
                placeholder="太郎"
              />
            </FormField>
          </div>
        </div>

        {/* お子様情報 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-amber-700" />
            </div>
            <h2 className="font-medium text-amber-700">お子様情報</h2>
          </div>

          {fields.map((field, index) => (
            <ChildSection
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
              canRemove={fields.length > 1}
            />
          ))}

          <button
            type="button"
            onClick={() => append(createDefaultChild())}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-amber-300 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50"
          >
            <Plus className="w-4 h-4" />
            子供を追加
          </button>

          {errors.children?.root && (
            <p className="text-sm text-red-500">{errors.children.root.message}</p>
          )}
        </div>

        {/* 送信ボタン */}
        <div className="sticky bottom-0 bg-amber-50/50 pt-4 pb-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white rounded-xl shadow-lg transition-colors font-medium"
          >
            {isSubmitting ? "登録中..." : "登録を完了する"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
