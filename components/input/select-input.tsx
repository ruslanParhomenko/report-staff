"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type Props = {
  fieldName: string;
  placeHolder?: string;
  data: string[];
  disabled?: boolean;
  className?: string;
};

export default function SelectInput({
  fieldName,
  placeHolder,
  data,
  disabled,
  className,
}: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <FormItem>
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "flex justify-start min-w-24 [&>svg]:hidden",
                  className,
                )}
              >
                <SelectValue placeholder={placeHolder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {data.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
