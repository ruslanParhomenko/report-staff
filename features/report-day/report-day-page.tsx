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
import { Table, TableBody } from "@/components/ui/table";
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
import { cleanReportData } from "@/utils/clean-data-submit";
import { Button } from "@/components/ui/button";

const KEY_STORAGE = "report-row-item";

export default function ReportDayPage({ isAdmin }: { isAdmin: boolean }) {
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

  const resetArrays = () => {
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
  };

  const isOperational = useOperationalDayCheck(date);

  const onSubmit: SubmitHandler<ReportType> = async (data) => {
    const { date, ...rest } = data;
    const cleanData = cleanReportData(rest);

    const dateValue = new Date(date);
    const month = MONTHS[dateValue.getMonth()];
    const year = dateValue.getFullYear().toString();
    const day = dateValue.getDate().toString();
    const uniqueKey = `${year}-${month}`;

    await createReport({
      day: day,
      uniqueKey: uniqueKey,
      data: cleanData,
    });
    toast.success("отчет сохранен");

    form.reset();
    resetArrays();
    form.setValue("date", new Date().toISOString().split("T")[0]);
  };

  // useEffect(() => {
  //   if (!isLoaded) return;

  //   resetArrays();
  // }, [isLoaded]);

  if (!isLoaded) return null;

  const formId = "report-day-form";

  return (
    <FormInput form={form} onSubmit={onSubmit} formId={formId}>
      <div className="flex w-full justify-center items-center gap-6 mb-1">
        <div className=" text-red-800 text-center p-0">
          {!isOperational && "выплните сохранение отчета"}
        </div>
        <DatePickerInput fieldName="date" disabled={!isAdmin} />
        <Button
          form={formId}
          type="submit"
          className="h-6 w-24 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          сохранить
        </Button>
      </div>
      <Table className="[&_td]:py-0">
        <TableBody>
          <ReportRow
            data={PRODUCTS_FIRST}
            arrayName="first"
            form={form}
            disabled={!isOperational}
            className="[&>td]:text-blue-400"
          />
          <ReportRow
            data={PRODUCTS_SECOND}
            arrayName="second"
            form={form}
            disabled={!isOperational}
            className="[&>td]:text-black"
          />
          <ReportRow
            data={PRODUCTS_SNACKS}
            arrayName="deserts"
            form={form}
            disabled={!isOperational}
            className="[&>td]:text-red-400"
          />
        </TableBody>
      </Table>
    </FormInput>
  );
}
