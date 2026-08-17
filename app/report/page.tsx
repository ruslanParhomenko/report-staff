import { headers } from "next/headers";
import { getDataProducts } from "../action/data-products/get-data-products";
import {
  getReportsByMonth,
  getReportsByYear,
} from "@/features/report/report-form/actions/get-report";
import { ReportPage } from "@/features/report";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const headerStore = await headers();
  const isAdmin = headerStore.get("x-is-admin") === "true";

  const { month, tab, year } = await searchParams;
  if (!month || !tab || !year) return null;

  const dataProducts = await getDataProducts();
  const dataReportByMonth = await getReportsByMonth(year, month);
  const dataReportByYear = await getReportsByYear(year);
  return (
    <ReportPage
      dataProducts={dataProducts}
      dataReportByMonth={dataReportByMonth}
      dataReportByYear={dataReportByYear}
      month={month}
      year={year}
      isAdmin={isAdmin}
    />
  );
}
