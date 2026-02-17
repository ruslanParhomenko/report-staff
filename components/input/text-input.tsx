"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type TextInputProps = {
  fieldName: string;
  placeHolder?: string;
  className?: string;
  disabled?: boolean;
};

function TextInput({
  fieldName,
  placeHolder,
  className,
  disabled = false,
}: TextInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={fieldName}
      defaultValue={""}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl className={cn("w-full", className)}>
              <Input placeholder={placeHolder} {...field} disabled={disabled} />
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
export default TextInput;
