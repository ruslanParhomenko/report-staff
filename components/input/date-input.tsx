"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

function formatDisplay(dateStr: string | undefined) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatValueLocal(date: Date | undefined) {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function DatePickerInput({
  fieldName,
  disabled,
}: {
  fieldName: string;
  disabled?: boolean;
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => {
        const [open, setOpen] = React.useState(false);

        return (
          <FormItem className="w-24">
            <FormControl>
              <Popover
                open={disabled ? false : open}
                onOpenChange={(v) => {
                  if (!disabled) setOpen(v);
                }}
              >
                <PopoverTrigger asChild>
                  <InputGroup className="border-0 text-blue-800 shadow-none h-6">
                    <InputGroupInput
                      value={formatDisplay(field.value)}
                      placeholder="June 01, 2025"
                      readOnly
                    />
                  </InputGroup>
                </PopoverTrigger>

                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      field.onChange(formatValueLocal(date));
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </FormControl>

            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
}
