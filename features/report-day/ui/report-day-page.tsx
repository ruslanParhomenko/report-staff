"use client";

import { GetReportData } from "../../report-form/model/type";
import { useSearchParams } from "next/navigation";
import ReportTable from "./report-day-table";
import NoProducts from "@/components/pages/no-products";

export function ReportDayPage({
  dataReportByMonth,
}: {
  dataReportByMonth: GetReportData[];
}) {
  const searchParams = useSearchParams();
  const reportDay = searchParams.get("day") || "";

  const selectedDayData = dataReportByMonth?.find(
    (day) => day.id === reportDay,
  );

  if (!selectedDayData) {
    return <NoProducts />;
  }

  return <ReportTable dataByDay={selectedDayData} />;
}
