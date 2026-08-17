"use client";

import { ReportFormPage } from "./report-form/ui/report-form";
import ReportMonthPage from "./report-month/report-month-page";

import { DataProducts } from "@/types/data-products";
import { useSearchParams } from "next/navigation";
import { GetReportData } from "./report-form/model/type";
import ReportDayPage from "./report-day/report-day-page";
import ReportYearPage from "./report-year/report-year-page";
import ReportRefreshBar from "./report-refresh-bar/report-refresh-bar";

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
  const showRefresh = tab && tab !== "form";

  return (
    <div className="space-y-4">
      {showRefresh && <ReportRefreshBar isAdmin={isAdmin} />}

      {tab === "form" && <ReportFormPage dataProducts={dataProducts} />}
      {tab === "month" && (
        <ReportMonthPage data={dataReportByMonth} month={month} year={year} />
      )}
      {tab === "day" && <ReportDayPage dataReportByMonth={dataReportByMonth} />}
      {tab === "year" && <ReportYearPage data={dataReportByYear} year={year} />}
    </div>
  );
}
