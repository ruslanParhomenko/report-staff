"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/components/wrapper/form-wrapper";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { defaultValueReport, reportSchema, ReportType } from "../model/schema";

import { cleanReportData } from "@/utils/clean-data-submit";

import { DataProducts } from "@/types/data-products";
import { createReport } from "../actions/create-report-day";

import SelectInputWithSearch from "@/components/input/select-input-search";
import NumericInput from "@/components/input/numeric-input";

import { Button } from "@/components/ui/button";
import { AddRemoveFieldsButton } from "@/components/buttons/action-fields-button";
import { formatNow } from "@/utils/format-date";
import { useSession } from "next-auth/react";
import ReportSection from "./report-section";

export function ReportFormPage({
  dataProducts,
}: {
  dataProducts: DataProducts | null;
}) {
  const { data } = useSession();

  const role = data?.user?.role;
  const isDisabled = role !== "ADMIN" && role !== "CUCINA";

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
      day: "13",
      time: "01:40:00",
      products: cleanData,
      timeMs: 1786574400000,
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
          isDisabled={isDisabled}
        />

        <div className="w-full h-px bg-gray-200" />

        <ReportSection
          title="Второе"
          fieldArray={secondArray}
          products={PRODUCTS_SECOND}
          fieldNamePrefix="second"
          defaultValues={defaultFieldValue}
          isDisabled={isDisabled}
        />

        <div className="w-full h-px bg-gray-200" />

        <ReportSection
          title="Гарнир"
          fieldArray={garnishArray}
          products={PRODUCTS_GARNISH}
          fieldNamePrefix="garnish"
          defaultValues={defaultFieldValue}
          isDisabled={isDisabled}
        />

        <div className="w-full h-px bg-gray-200" />

        <ReportSection
          title="Фуршет"
          fieldArray={buffetArray}
          products={PRODUCTS_BUFFET}
          fieldNamePrefix="buffet"
          defaultValues={defaultFieldValue}
          isDisabled={isDisabled}
        />

        <div className="w-full h-px bg-gray-200" />

        <ReportSection
          title="Закуски"
          fieldArray={desertsArray}
          products={PRODUCTS_SNACKS}
          fieldNamePrefix="deserts"
          defaultValues={defaultFieldValue}
          isDisabled={isDisabled}
        />
      </div>

      <Button
        type="submit"
        className="mt-8 px-8 py-2 h-10 font-semibold"
        disabled={!form.formState.isValid || isDisabled}
      >
        Отправить
      </Button>
    </FormInput>
  );
}
