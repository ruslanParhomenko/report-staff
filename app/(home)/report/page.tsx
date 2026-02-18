import { getReportDataByUniqueKey } from "@/app/action/report/report-action";
import ReportDayPage from "@/features/report-day/report-day-page";

import ReportMonthPage from "@/features/report-month/report-month-page";
import { Activity } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { month, year, tab } = await searchParams;
  if (!month || !year || !tab) return null;
  const uniqueKey = `${year}-${month}`;

  const dataByMonth =
    tab === "month" && (await getReportDataByUniqueKey(uniqueKey));
  return (
    <>
      <Activity mode={tab === "day" ? "visible" : "hidden"}>
        <ReportDayPage />
      </Activity>
      <Activity mode={tab === "month" ? "visible" : "hidden"}>
        <ReportMonthPage data={dataByMonth} />
      </Activity>
    </>
  );
}
