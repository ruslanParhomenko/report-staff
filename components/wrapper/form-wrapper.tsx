"use client";

import { SubmitHandler, UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { DatePickerInput } from "../input/date-input";
import { Form } from "../ui/form";

type FormInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
};

export default function FormInput<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormInputProps<T>) {
  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col h-[93vh]", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DatePickerInput />

        {children}
      </form>
    </Form>
  );
}
