import { headers } from "next/headers";
import { getDataProducts } from "../action/data-products/get-data-products";
import { getReportsByYear } from "@/features/report/report-form/actions/get-report";
import { ReportPage } from "@/features/report";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const headerStore = await headers();
  const isAdmin = headerStore.get("x-is-admin") === "true";

  const { month, tab } = await searchParams;
  if (!month || !tab) return null;
  const year = new Date().getFullYear().toString();

  const dataProducts = await getDataProducts();
  const dataReport = await getReportsByYear(year, month);
  return (
    <ReportPage
      dataProducts={dataProducts}
      dataReport={dataReport}
      month={month}
      year={year}
      isAdmin={isAdmin}
    />
  );
}
