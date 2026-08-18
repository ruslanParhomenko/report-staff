import { headers } from "next/headers";
import { getDataProducts } from "../action/data-products/get-data-products";
import {
  getReportsByMonth,
  getReportsByYear,
} from "@/features/report-form/actions/get-report";
import { ReportPage } from "@/features/report";
import { ParamsUrl } from "@/types/params-url";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const headerStore = await headers();
  const isAdmin = headerStore.get("x-is-admin") === "true";

  const params = await searchParams;
  const { month, tab, year } = params;
  if (!month || !tab || !year) return null;

  let data;
  switch (tab) {
    case "form":
      data = await getDataProducts();
      break;
    case "month":
      data = await getReportsByMonth(year, month);
      break;
    case "day":
      data = await getReportsByMonth(year, month);
      break;
    case "year":
      data = await getReportsByYear(year);
      break;
    default:
      data = null;
  }

  return (
    <ReportPage params={params as ParamsUrl} data={data} isAdmin={isAdmin} />
  );
}
