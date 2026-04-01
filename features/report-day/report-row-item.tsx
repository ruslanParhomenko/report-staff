import { useEffect, useState } from "react";
import { useWatch, UseFormReturn } from "react-hook-form";
import TextInput from "@/components/input/text-input";
import { TableCell, TableRow } from "@/components/ui/table";
import { ReportType } from "./schema";
import { formatNow } from "@/utils/format-date";
import { handleMultiTableNavigation } from "@/utils/handle-table-navigation";

type ReportRowItemProps = {
  index: number;
  arrayName: keyof Omit<ReportType, "date">;
  form: UseFormReturn<ReportType>;
  disabled?: boolean;
};

export default function ReportRowItem({
  index,
  arrayName,
  form,
  disabled,
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
        // если фокус ушёл ВНЕ строки
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsRowFocused(false);
        }
      }}
      className={isRowFocused ? "bg-gray-200" : ""}
    >
      <TableCell className="w-6">{index + 1}</TableCell>

      <TableCell className="w-20">
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
        />
      </TableCell>

      {items?.valueByTime?.map((v, i) => (
        <TableCell key={i} className="w-30 p-0">
          <div className="flex gap-3 items-center">
            {/* VALUE */}
            <input
              {...form.register(`${arrayName}.${index}.valueByTime.${i}.value`)}
              placeholder="..."
              className="w-12 h-6 border-0 border-x rounded-none shadow-none bg-transparent px-2"
              disabled={disabled}
              data-group={arrayName}
              data-row={index}
              data-col={i}
              onKeyDown={handleMultiTableNavigation}
            />

            {/* TIME */}
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
