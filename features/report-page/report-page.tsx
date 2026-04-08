import { Activity } from "react";
import ReportDayPage from "../report-day/report-day-page";
import ReportMonthPage from "../report-month/report-month-page";
import { GetReportType } from "@/app/action/report/report-action";

export default function ReportPage({
  dataByMonth,
  month,
  year,
  tab,
  isAdmin,
}: {
  dataByMonth: GetReportType | null;
  month: string;
  year: string;
  tab: string;
  isAdmin: boolean;
}) {
  return (
    <>
      <Activity mode={tab === "day" ? "visible" : "hidden"}>
        <ReportDayPage isAdmin={isAdmin} />
      </Activity>
      <Activity mode={tab === "month" ? "visible" : "hidden"}>
        <ReportMonthPage data={dataByMonth} month={month} year={year} />
      </Activity>
    </>
  );
}
