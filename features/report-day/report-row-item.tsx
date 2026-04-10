import { useEffect, useState } from "react";
import { useWatch, UseFormReturn } from "react-hook-form";
import TextInput from "@/components/input/text-input";
import { TableCell, TableRow } from "@/components/ui/table";
import { ReportType } from "./schema";
import { formatNow } from "@/utils/format-date";
import { handleMultiTableNavigation } from "@/utils/handle-table-navigation";
import { cn } from "@/lib/utils";

type ReportRowItemProps = {
  index: number;
  arrayName: keyof Omit<ReportType, "date">;
  form: UseFormReturn<ReportType>;
  disabled?: boolean;
  className?: string;
};

export default function ReportRowItem({
  index,
  arrayName,
  form,
  disabled,
  className,
}: ReportRowItemProps) {
  const [isRowFocused, setIsRowFocused] = useState(false);
  const values = useWatch({
    name: `${arrayName}.${index}.valueByTime`,
    control: form.control,
  });

  useEffect(() => {
    if (!values) return;

    const total = values.reduce((acc, v) => acc + Number(v.value || 0), 0);

    if (form.getValues(`${arrayName}.${index}.value`) !== String(total)) {
      form.setValue(`${arrayName}.${index}.value`, String(total));
    }

    values?.forEach((value, idx) => {
      if (value?.value && !value?.time) {
        form.setValue(
          `${arrayName}.${index}.valueByTime.${idx}.time`,
          formatNow(),
          { shouldDirty: true },
        );
      }
    });
  }, [values, form, arrayName, index]);

  const items = form.getValues(`${arrayName}.${index}`);

  return (
    <TableRow
      onFocusCapture={() => setIsRowFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsRowFocused(false);
        }
      }}
      className={cn(isRowFocused ? "bg-gray-200" : "", className)}
    >
      <TableCell className="w-6">{index + 1}</TableCell>

      <TableCell className="w-20 sticky left-0">
        <TextInput
          fieldName={`${arrayName}.${index}.name`}
          className={`w-50 border-0 shadow-none font-bold h-6 ${
            isRowFocused ? "text-red-500" : ""
          }`}
          disabled={disabled}
        />
      </TableCell>

      <TableCell className="w-30 p-0">
        <TextInput
          fieldName={`${arrayName}.${index}.value`}
          className="w-12 border-0 shadow-none font-bold h-6"
          disabled
        />
      </TableCell>

      {items?.valueByTime?.map((v, i) => (
        <TableCell key={i} className="w-30 p-0">
          <div className="flex gap-3 items-center">
            <input
              {...form.register(`${arrayName}.${index}.valueByTime.${i}.value`)}
              className="w-12 h-6 border rounded-md m-0.5 shadow-none  px-2 cursor-pointer"
              style={{ backgroundColor: "gray" }}
              disabled={disabled}
              data-group={arrayName}
              data-row={index}
              data-col={i}
              onKeyDown={handleMultiTableNavigation}
            />

            <input
              {...form.register(`${arrayName}.${index}.valueByTime.${i}.time`)}
              className="w-12 text-xs text-red-800 p-0 h-6 border-0 shadow-none outline-none"
              disabled
            />
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}
