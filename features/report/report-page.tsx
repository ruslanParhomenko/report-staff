"use client";

import { ReportFormPage } from "./report-form/ui/report-form";
import ReportMonthPage from "./report-month/report-month-page";

import { DataProducts } from "@/types/data-products";
import { useSearchParams } from "next/navigation";
import { GetReportData } from "./report-form/model/type";
import ReportDayPage from "./report-day/report-day-page";

export function ReportPage({
  dataProducts,
  dataReport,
  month,
  year,
  isAdmin,
}: {
  dataProducts: DataProducts | null;
  dataReport: GetReportData[] | null;
  month: string;
  year: string;
  isAdmin: boolean;
}) {
  const tab = useSearchParams().get("tab");
  return (
    <>
      {tab === "form" && <ReportFormPage dataProducts={dataProducts} />}

      {tab === "month" && (
        <ReportMonthPage data={dataReport} month={month} year={year} />
      )}
      {tab === "day" && (
        <ReportDayPage data={dataReport} month={month} year={year} />
      )}
    </>
  );
}
