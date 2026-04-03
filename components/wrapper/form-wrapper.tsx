"use client";

import { SubmitHandler, UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Form } from "../ui/form";
import { useState } from "react";
import ModalConfirm from "../modal/modal-confirm";

type FormInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  formId: string;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
};

export default function FormInput<T extends FieldValues>({
  form,
  formId,
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
        className={cn("flex flex-col h-[96vh]", className)}
        onSubmit={form.handleSubmit(handleFormSubmit)}
        id={formId}
      >
        {children}

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
