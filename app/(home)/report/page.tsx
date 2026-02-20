import { getReportDataByUniqueKey } from "@/app/action/report/report-action";
import ReportDayPage from "@/features/report-day/report-day-page";

import ReportMonthPage from "@/features/report-month/report-month-page";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Activity } from "react";

const SET_ACCESS = ["ADMIN", "SCR"];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  if (!SET_ACCESS.includes(session.user?.role ?? "")) {
    redirect("/");
  }
  const { month, year, tab } = await searchParams;
  if (!month || !year || !tab) return null;
  const uniqueKey = `${year}-${month}`;

  const dataByMonth =
    tab === "month" ? await getReportDataByUniqueKey(uniqueKey) : null;
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
