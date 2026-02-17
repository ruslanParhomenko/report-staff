"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/components/wrapper/form-wrapper";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { toast } from "sonner";
import SelectInput from "@/components/input/select-input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  PRODUCTS_FIRST,
  PRODUCTS_SECOND,
  PRODUCTS_SNACKS,
} from "@/constants/product-data";
import TextInput from "@/components/input/text-input";
import { defaultValueReport, reportSchema, ReportType } from "./schema";
import { useEffect } from "react";
import ReportRow from "./report-row";

export default function ReportPage() {
  const form = useForm<ReportType>({
    defaultValues: defaultValueReport,
    resolver: zodResolver(reportSchema),
  });

  const values = useWatch({ control: form.control });
  const first = useFieldArray({
    control: form.control,
    name: "first",
  });

  const second = useFieldArray({
    control: form.control,
    name: "second",
  });

  const snacks = useFieldArray({
    control: form.control,
    name: "snacks",
  });

  const deserts = useFieldArray({
    control: form.control,
    name: "deserts",
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Manual submit:", data);
    toast.success("Form submitted!");
  };

  return (
    <FormInput form={form} onSubmit={onSubmit}>
      <Table>
        <TableBody>
          <ReportRow
            data={first}
            arrayName="first"
            selectData={PRODUCTS_FIRST}
            form={form}
          />
          <ReportRow
            data={second}
            arrayName="second"
            selectData={PRODUCTS_SECOND}
            form={form}
          />
          <ReportRow
            data={snacks}
            arrayName="snacks"
            selectData={PRODUCTS_SNACKS}
            form={form}
          />
          <ReportRow
            data={deserts}
            arrayName="deserts"
            selectData={PRODUCTS_SNACKS}
            form={form}
          />
        </TableBody>
      </Table>
    </FormInput>
  );
}
