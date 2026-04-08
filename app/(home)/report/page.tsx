import { getReportDataByUniqueKey } from "@/app/action/report/report-action";

import ReportPage from "@/features/report-page/report-page";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
  const isAdmin = session.user?.role === "ADMIN";
  if (!SET_ACCESS.includes(session.user?.role ?? "")) {
    redirect("/");
  }
  const { month, tab } = await searchParams;
  if (!month || !tab) return null;
  const year = new Date().getFullYear().toString();
  const uniqueKey = `${year}-${month}`;

  const dataByMonth =
    tab === "month" ? await getReportDataByUniqueKey(uniqueKey) : null;
  return (
    <ReportPage
      dataByMonth={dataByMonth}
      month={month}
      year={year}
      tab={tab}
      isAdmin={isAdmin}
    />
  );
}
