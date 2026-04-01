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
import {
  defaultValueReport,
  defaultValueTime,
  reportSchema,
  ReportType,
} from "./schema";
import ReportRow from "./report-row";
import { useLocalStorageForm } from "@/hooks/use-local-storage";
import { DatePickerInput } from "@/components/input/date-input";
import { createReport } from "@/app/action/report/report-action";
import { MONTHS } from "@/utils/get-month-days";
import { useOperationalDayCheck } from "@/hooks/use-in-day";
import { useEffect } from "react";

const KEY_STORAGE = "report-row-item";

export default function ReportDayPage() {
  const form = useForm<ReportType>({
    defaultValues: defaultValueReport,
    resolver: zodResolver(reportSchema),
  });

  const { isLoaded } = useLocalStorageForm(form, KEY_STORAGE);

  const date = useWatch({
    control: form.control,
    name: "date",
  });

  const firstArray = useFieldArray({
    control: form.control,
    name: "first",
  });

  const secondArray = useFieldArray({
    control: form.control,
    name: "second",
  });

  const desertsArray = useFieldArray({
    control: form.control,
    name: "deserts",
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

    // form.reset(defaultValueReport);
    form.setValue("date", new Date().toISOString().split("T")[0]);
  };

  useEffect(() => {
    if (!isLoaded) return;

    firstArray.replace(
      PRODUCTS_FIRST.map((name) => ({
        name,
        value: "",
        valueByTime: defaultValueTime,
      })),
    );

    secondArray.replace(
      PRODUCTS_SECOND.map((name) => ({
        name,
        value: "",
        valueByTime: defaultValueTime,
      })),
    );

    desertsArray.replace(
      PRODUCTS_SNACKS.map((name) => ({
        name,
        value: "",
        valueByTime: defaultValueTime,
      })),
    );
  }, [isLoaded]);

  if (!isLoaded) return null;

  return (
    <FormInput form={form} onSubmit={onSubmit}>
      <DatePickerInput fieldName="date" />
      <Table className="[&_td]:py-0">
        <TableBody>
          <TableRow className="bg-background border-0">
            <TableCell colSpan={13} className=" text-red-800 text-center p-0">
              {!isOperational && "Выход за рабочий день смените дату"}
            </TableCell>
          </TableRow>
          <TableRow className="text-muted-foreground border-0 bg-gray-400">
            <TableCell colSpan={12} className="text-red-800 font-bold">
              первое
            </TableCell>
          </TableRow>
          <ReportRow
            data={PRODUCTS_FIRST}
            arrayName="first"
            form={form}
            disabled={!isOperational}
          />
          <TableRow className="text-muted-foreground border-0 bg-gray-400">
            <TableCell colSpan={12} className="text-red-800 font-bold">
              второе и гарнир
            </TableCell>
          </TableRow>
          <ReportRow
            data={PRODUCTS_SECOND}
            arrayName="second"
            form={form}
            disabled={!isOperational}
          />

          <TableRow className="text-muted-foreground border-0 bg-gray-400">
            <TableCell colSpan={12} className="text-red-800 font-bold">
              сэндвичи и десерты
            </TableCell>
          </TableRow>
          <ReportRow
            data={PRODUCTS_SNACKS}
            arrayName="deserts"
            form={form}
            disabled={!isOperational}
          />
        </TableBody>
      </Table>
    </FormInput>
  );
}
