"use client";

import { SubmitHandler, UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { useState } from "react";
import ModalConfirm from "../modal/modal-confirm";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<T | null>(null);

  const handleFormSubmit: SubmitHandler<T> = (data) => {
    setFormDataToSubmit(data);
    setIsModalOpen(true);
  };
  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col h-[90vh]", className)}
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        {children}
        <div className="sticky bottom-0 w-full flex justify-start gap-6 px-4 py-2 mt-auto bg-background z-30">
          <Button type="submit" className=" mt-auto h-8 w-24">
            save
          </Button>
        </div>
        <ModalConfirm
          open={isModalOpen}
          setOpen={setIsModalOpen}
          handleConfirm={async () => {
            if (!formDataToSubmit) return;

            await onSubmit(formDataToSubmit);

            setIsModalOpen(false);
            setFormDataToSubmit(null);
          }}
        />
      </form>
    </Form>
  );
}
