"use client";

import { SubmitHandler, UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Form } from "../ui/form";
import { useState } from "react";
import ModalConfirm from "../modal/modal-confirm";
import { toast } from "sonner";

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

  const handleConfirm = async () => {
    if (!formDataToSubmit) return;

    setIsModalOpen(false);

    const data = formDataToSubmit;

    setFormDataToSubmit(null);

    await onSubmit(data);

    setTimeout(() => {
      toast.success("data submitted");
    }, 2000);
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex flex-col items-center justify-center h-[90vh]",
          className,
        )}
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        {children}
      </form>

      <ModalConfirm
        open={isModalOpen}
        setOpen={setIsModalOpen}
        handleConfirm={handleConfirm}
      />
    </Form>
  );
}
