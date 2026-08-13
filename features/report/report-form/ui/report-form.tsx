"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/components/wrapper/form-wrapper";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { defaultValueReport, reportSchema, ReportType } from "../model/schema";

import { MONTHS } from "@/utils/get-month-days";

import { cleanReportData } from "@/utils/clean-data-submit";

import { DataProducts } from "@/types/data-products";
import { getReportDate } from "../lib/get-report-date";
import { createReport } from "../actions/create-report-day";

import SelectInputWithSearch from "@/components/input/select-input-search";
import NumericInput from "@/components/input/numeric-input";

import { Button } from "@/components/ui/button";
import { AddRemoveFieldsButton } from "@/components/buttons/action-fields-button";
import { formatNow } from "@/utils/format-date";

interface SectionProps {
  title: string;
  fieldArray: any;
  products: string[];
  fieldNamePrefix: string;
  defaultValues: any;
}

function ReportSection({
  title,
  fieldArray,
  products,
  fieldNamePrefix,
  defaultValues,
}: SectionProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h3 className="text-md font-semibold mb-2 text-gray-500">{title}</h3>
      <div className="flex justify-center">
        <Table className="w-auto">
          <TableBody>
            {fieldArray.fields.map((field: any, index: number) => (
              <TableRow key={field.id} className="border-0">
                <TableCell className="flex gap-4 items-center justify-center py-0.5 px-4">
                  <SelectInputWithSearch
                    data={products}
                    fieldName={`${fieldNamePrefix}.${index}.name`}
                    className="w-80 shadow-none font-bold h-9 text-xl px-4"
                  />
                  <NumericInput
                    fieldName={`${fieldNamePrefix}.${index}.value`}
                    className="shadow-none font-bold h-9 w-20 text-xl!"
                  />
                  <AddRemoveFieldsButton
                    formField={fieldArray}
                    defaultValues={defaultValues}
                    index={index}
                    limit={2}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function ReportFormPage({
  dataProducts,
}: {
  dataProducts: DataProducts | null;
}) {
  const PRODUCTS_FIRST = dataProducts?.staff_first || [];
  const PRODUCTS_SECOND = dataProducts?.staff_main || [];
  const PRODUCTS_SNACKS = dataProducts?.staff_snacks || [];
  const PRODUCTS_GARNISH = dataProducts?.staff_garnish || [];

  const PRODUCTS_BUFFET = [
    ...(dataProducts?.garnish || []),
    ...(dataProducts?.soup || []),
    ...(dataProducts?.salad || []),
    ...(dataProducts?.meat || []),
  ];

  const form = useForm<ReportType>({
    defaultValues: defaultValueReport,
    resolver: zodResolver(reportSchema),
  });

  const firstArray = useFieldArray({
    control: form.control,
    name: "first",
  });

  const secondArray = useFieldArray({
    control: form.control,
    name: "second",
  });

  const buffetArray = useFieldArray({
    control: form.control,
    name: "buffet",
  });

  const garnishArray = useFieldArray({
    control: form.control,
    name: "garnish",
  });

  const desertsArray = useFieldArray({
    control: form.control,
    name: "deserts",
  });

  const onSubmit: SubmitHandler<ReportType> = async (data) => {
    const cleanData = cleanReportData(data);

    console.log("cleanData", cleanData);

    if (!cleanData) {
      toast.error("Заполните все поля", {
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
      return;
    }

    const { year, month, time, reportDay, timeMs } = formatNow();

    await createReport({
      year,
      month,
      day: reportDay,
      time,
      products: cleanData,
      timeMs,
    });

    form.reset();
    setTimeout(() => {
      toast.success("data submitted");
    }, 2000);
  };

  const defaultFieldValue = {
    name: "",
    value: "",
  };

  return (
    <FormInput form={form} onSubmit={onSubmit}>
      <div className="w-full flex flex-col gap-3 items-center justify-center">
        <ReportSection
          title="Первое"
          fieldArray={firstArray}
          products={PRODUCTS_FIRST}
          fieldNamePrefix="first"
          defaultValues={defaultFieldValue}
        />

        <div className="w-full h-px bg-gray-200" />

        <ReportSection
          title="Второе"
          fieldArray={secondArray}
          products={PRODUCTS_SECOND}
          fieldNamePrefix="second"
          defaultValues={defaultFieldValue}
        />

        <div className="w-full h-px bg-gray-200" />

        <ReportSection
          title="Гарнир"
          fieldArray={garnishArray}
          products={PRODUCTS_GARNISH}
          fieldNamePrefix="garnish"
          defaultValues={defaultFieldValue}
        />

        <div className="w-full h-px bg-gray-200" />

        <ReportSection
          title="Фуршет"
          fieldArray={buffetArray}
          products={PRODUCTS_BUFFET}
          fieldNamePrefix="buffet"
          defaultValues={defaultFieldValue}
        />

        <div className="w-full h-px bg-gray-200" />

        <ReportSection
          title="Закуски"
          fieldArray={desertsArray}
          products={PRODUCTS_SNACKS}
          fieldNamePrefix="deserts"
          defaultValues={defaultFieldValue}
        />
      </div>

      <Button type="submit" className="mt-8 px-8 py-2 h-10 font-semibold">
        Отправить
      </Button>
    </FormInput>
  );
}
