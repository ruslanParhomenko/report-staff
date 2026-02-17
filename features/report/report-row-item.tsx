import { useEffect } from "react";
import { useWatch, UseFormReturn } from "react-hook-form";
import SelectInput from "@/components/input/select-input";
import TextInput from "@/components/input/text-input";
import { TableCell, TableRow } from "@/components/ui/table";
import { ReportType } from "./schema";

type ReportRowItemProps = {
  index: number;
  arrayName: keyof Omit<ReportType, "date">;
  form: UseFormReturn<ReportType>;
  selectData: string[];
};

export default function ReportRowItem({
  index,
  arrayName,
  form,
  selectData,
}: ReportRowItemProps) {
  // Подписываемся на valueByTime конкретной строки
  const values = useWatch({
    name: `${arrayName}.${index}.valueByTime`,
    control: form.control,
  });

  // Считаем total для этой строки
  useEffect(() => {
    if (!values) return;
    const total = values.reduce((acc, v) => acc + Number(v.value || 0), 0);
    if (form.getValues(`${arrayName}.${index}.value`) !== String(total)) {
      form.setValue(`${arrayName}.${index}.value`, String(total));
    }
  }, [values, form, arrayName, index]);

  const item = form.getValues(`${arrayName}.${index}`);

  return (
    <TableRow>
      <TableCell>
        <SelectInput
          fieldName={`${arrayName}.${index}.name`}
          placeHolder="Выберите продукт"
          data={selectData}
        />
      </TableCell>

      <TableCell>
        <TextInput fieldName={`${arrayName}.${index}.value`} className="w-12" />
      </TableCell>

      {item.valueByTime.map((v, i) => (
        <TableCell key={i}>
          <TextInput
            fieldName={`${arrayName}.${index}.valueByTime.${i}.value`}
            placeHolder="..."
            className="w-12"
          />
        </TableCell>
      ))}
    </TableRow>
  );
}
