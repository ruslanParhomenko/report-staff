import { useEffect } from "react";
import {
  useWatch,
  UseFormReturn,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import SelectInput from "@/components/input/select-input";
import TextInput from "@/components/input/text-input";
import { TableCell, TableRow } from "@/components/ui/table";
import { defaultValueItem, ReportType } from "./schema";
import { MinusIcon, PlusIcon } from "lucide-react";
import { formatNow } from "@/utils/format-date";

type ReportRowItemProps = {
  append: UseFieldArrayAppend<ReportType, keyof Omit<ReportType, "date">>;
  remove: UseFieldArrayRemove;
  index: number;
  arrayName: keyof Omit<ReportType, "date">;
  form: UseFormReturn<ReportType>;
  selectData: string[];
};

export default function ReportRowItem({
  append,
  remove,
  index,
  arrayName,
  form,
  selectData,
}: ReportRowItemProps) {
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

    values?.forEach((item, idx) => {
      if (item?.value && !item?.time) {
        form.setValue(
          `${arrayName}.${index}.valueByTime.${idx}.time`,
          formatNow(),
          {
            shouldDirty: true,
          },
        );
      }
    });
  }, [values, form, arrayName, index]);

  const item = form.getValues(`${arrayName}.${index}`);

  return (
    <TableRow>
      <TableCell className="w-6"> {index + 1}</TableCell>
      <TableCell className="w-20">
        <SelectInput
          fieldName={`${arrayName}.${index}.name`}
          placeHolder="Выберите продукт"
          data={selectData}
        />
      </TableCell>

      <TableCell className="w-30">
        <TextInput
          fieldName={`${arrayName}.${index}.value`}
          className="w-12 border-0 shadow-none font-bold"
        />
      </TableCell>

      {item?.valueByTime?.map((v, i) => (
        <TableCell key={i} className="w-30">
          <div className="flex gap-3">
            <TextInput
              fieldName={`${arrayName}.${index}.valueByTime.${i}.value`}
              placeHolder="..."
              className="w-12"
            />
            <TextInput
              fieldName={`${arrayName}.${index}.valueByTime.${i}.time`}
              placeHolder="..."
              className=" text-xs! text-red-800 p-0 border-0 shadow-none"
            />
          </div>
        </TableCell>
      ))}
      <TableCell className="w-8">
        {index > 0 && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="cursor-pointer text-red-800"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
        )}
      </TableCell>
      <TableCell className="w-8">
        <button
          type="button"
          onClick={() => append(defaultValueItem)}
          className="cursor-pointer text-blue-800"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}
