"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/components/wrapper/form-wrapper";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import {
  PRODUCTS_FIRST,
  PRODUCTS_SECOND,
  PRODUCTS_SNACKS,
} from "@/constants/product-data";
import { defaultValueReport, reportSchema, ReportType } from "./schema";
import ReportRow from "./report-row";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { DatePickerInput } from "@/components/input/date-input";
import { createReport } from "@/app/action/report/report-action";
import { MONTHS } from "@/utils/get-month-days";
import { useOperationalDayCheck } from "@/hooks/use-in-day";

const KEY_STORAGE = "report-row-item";

export default function ReportDayPage() {
  const form = useForm<ReportType>({
    defaultValues: defaultValueReport,
    resolver: zodResolver(reportSchema),
  });

  const { isLoaded } = useLocalStorageForm(form, KEY_STORAGE);

  const first = useFieldArray({
    control: form.control,
    name: "first",
  });

  const second = useFieldArray({
    control: form.control,
    name: "second",
  });

  const deserts = useFieldArray({
    control: form.control,
    name: "deserts",
  });

  const date = useWatch({
    control: form.control,
    name: "date",
  });

  const isOperational = useOperationalDayCheck(date);

  const onSubmit: SubmitHandler<ReportType> = async (data) => {
    const { date, ...rest } = data;
    const dateValue = new Date(date);
    const month = MONTHS[dateValue.getMonth()];
    const year = dateValue.getFullYear().toString();
    const day = dateValue.getDate().toString();
    const uniqueKey = `${year}-${month}`;

    await createReport({
      day: day,
      uniqueKey: uniqueKey,
      data: rest,
    });
    toast.success("отчет сохранен");

    form.reset(defaultValueReport);
  };

  if (!isLoaded) return null;

  return (
    <FormInput form={form} onSubmit={onSubmit}>
      <DatePickerInput fieldName="date" />
      <Table>
        <TableBody>
          <TableRow className="h-12 text-muted-foreground">
            <TableCell colSpan={4}>первое</TableCell>
          </TableRow>
          <ReportRow
            data={first}
            arrayName="first"
            selectData={PRODUCTS_FIRST}
            form={form}
            disabled={!isOperational}
          />
          <TableRow className="h-12 text-muted-foreground">
            <TableCell colSpan={4}>второе и гарнир</TableCell>
          </TableRow>
          <ReportRow
            data={second}
            arrayName="second"
            selectData={PRODUCTS_SECOND}
            form={form}
            disabled={!isOperational}
          />

          <TableRow className="h-12 text-muted-foreground">
            <TableCell colSpan={4}>сэндвичи и десерты</TableCell>
          </TableRow>
          <ReportRow
            data={deserts}
            arrayName="deserts"
            selectData={PRODUCTS_SNACKS}
            form={form}
            disabled={!isOperational}
          />
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} className="h-12 text-red-800 text-center">
              {!isOperational && "Выход за рабочий день смените дату"}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </FormInput>
  );
}
