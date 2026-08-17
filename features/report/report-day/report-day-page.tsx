"use client";

import { GetReportData } from "../report-form/model/type";
import { useSearchParams } from "next/navigation";
import ReportTable from "./report-day-table";

export default function ReportDayPage({
  dataReportByMonth,
}: {
  dataReportByMonth: GetReportData[] | null;
}) {
  const searchParams = useSearchParams();
  const reportDay = searchParams.get("day") || "";

  const selectedDayData =
    dataReportByMonth?.find((day) => day.id === reportDay) || null;

  return <ReportTable dataByDay={selectedDayData} />;
}
