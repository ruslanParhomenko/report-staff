"use client";

import { ReportFormPage } from "./report-form/ui/report-form";
import ReportMonthPage from "./report-month/report-month-page";

import { DataProducts } from "@/types/data-products";
import { useSearchParams } from "next/navigation";
import { GetReportData } from "./report-form/model/type";
import ReportDayPage from "./report-day/report-day-page";
import ReportYearPage from "./report-year/report-year-page";

export function ReportPage({
  dataProducts,
  dataReportByMonth,
  dataReportByYear,
  month,
  year,
  isAdmin,
}: {
  dataProducts: DataProducts | null;
  dataReportByMonth: GetReportData[] | null;
  dataReportByYear: GetReportData[] | null;
  month: string;
  year: string;
  isAdmin: boolean;
}) {
  const tab = useSearchParams().get("tab");
  return (
    <div className="mt-6">
      {tab === "form" && <ReportFormPage dataProducts={dataProducts} />}

      {tab === "month" && (
        <ReportMonthPage data={dataReportByMonth} month={month} year={year} />
      )}
      {tab === "day" && (
        <ReportDayPage
          dataReportByMonth={dataReportByMonth}
          month={month}
          year={year}
        />
      )}
      {tab === "year" && <ReportYearPage data={dataReportByYear} year={year} />}
    </div>
  );
}
