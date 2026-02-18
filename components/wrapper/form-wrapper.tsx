"use client";

import { SubmitHandler, UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Form } from "../ui/form";
import { Button } from "../ui/button";

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
        className={cn("flex flex-col h-[90vh]", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {children}
        <div className="sticky bottom-0 w-full flex justify-start gap-6 px-4 py-2 mt-auto bg-background z-30">
          <Button type="submit" className=" mt-auto h-8 w-24">
            save
          </Button>
        </div>
      </form>
    </Form>
  );
}
