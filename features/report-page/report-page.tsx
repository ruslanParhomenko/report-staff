import { Activity } from "react";
import ReportDayPage from "../report-day/report-day-page";
import ReportMonthPage from "../report-month/report-month-page";
import { GetReportType } from "@/app/action/report/report-action";

export default function ReportPage({
  dataByMonth,
  month,
  year,
  tab,
}: {
  dataByMonth: GetReportType | null;
  month: string;
  year: string;
  tab: string;
}) {
  return (
    <>
      <Activity mode={tab === "day" ? "visible" : "hidden"}>
        <ReportDayPage />
      </Activity>
      <Activity mode={tab === "month" ? "visible" : "hidden"}>
        <ReportMonthPage data={dataByMonth} month={month} year={year} />
      </Activity>
    </>
  );
}
