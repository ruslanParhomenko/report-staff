"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

// Формат для отображения: February 19, 2026
function formatDisplay(dateStr: string | undefined) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// Формат для хранения в форме: YYYY-MM-DD
function formatValueLocal(date: Date | undefined) {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // месяцы 0-11
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // YYYY-MM-DD
}

export function DatePickerInput({
  fieldName = "date",
  fieldLabel = "Select Date",
}: {
  fieldName?: string;
  fieldLabel?: string;
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => {
        const [open, setOpen] = React.useState(false);

        return (
          <FormItem className="w-48 mx-auto">
            {fieldLabel && <FormLabel>{fieldLabel}</FormLabel>}

            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <InputGroup>
                    <InputGroupInput
                      value={formatDisplay(field.value)}
                      placeholder="June 01, 2025"
                      readOnly
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Select date"
                      >
                        <CalendarIcon />
                        <span className="sr-only">Select date</span>
                      </InputGroupButton>
                    </InputGroupAddon>
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
                      field.onChange(formatValueLocal(date)); // теперь правильная локальная дата
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
