"use client";

import * as React from "react";
import FormInput from "@/components/wrapper/form-wrapper";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import SelectInput from "@/components/input/select-input";

export default function ReportPage() {
  const form = useForm({
    defaultValues: {
      test: "", // для Select
      date: new Date().toISOString(), // для DatePicker
    },
  });

  // Следим за всеми значениями формы
  const values = useWatch({ control: form.control });

  // Ручной сабмит (по кнопке)
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Manual submit:", data);
    toast.success("Form submitted!");
  };

  // Автосохранение каждые 3 секунды при изменении values
  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Autosave:", values);

      // Сохраняем в localStorage
      localStorage.setItem("report_autosave", JSON.stringify(values));

      // Выводим toast
      toast.success("Автосохранение прошло успешно");
    }, 3000);

    return () => clearTimeout(timer);
  }, [values]);

  return (
    <FormInput form={form} onSubmit={onSubmit}>
      <div className="w-72">
        <SelectInput
          fieldName="test"
          fieldLabel="Test"
          placeHolder="Select test"
          data={["test", "test2", "test3"]}
        />
      </div>
    </FormInput>
  );
}
