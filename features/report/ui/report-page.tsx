import { ReportFormPage } from "../../report-form/ui/report-form";
import { DataProducts } from "@/types/data-products";
import { GetReportData } from "../../report-form/model/type";

import { ReportMonthPage } from "../../report-month";
import { ParamsUrl } from "@/types/params-url";
import { ReportYearPage } from "../../report-year";
import { ReportDayPage } from "../../report-day";
import RefreshButton from "@/components/buttons/refresh-button";

export function ReportPage({
  params,
  data,
  isAdmin,
}: {
  params: ParamsUrl;
  data: unknown;
  isAdmin: boolean;
}) {
  const { month, tab, year } = params;

  const dataProducts = data as DataProducts;
  const dataReportByMonth = data as GetReportData[];
  const dataReportByYear = data as GetReportData[];

  const showRefresh = tab && tab == "day";

  return (
    <div className="space-y-4">
      {showRefresh && <RefreshButton isAdmin={isAdmin} />}

      {tab === "form" && <ReportFormPage dataProducts={dataProducts} />}
      {tab === "month" && (
        <ReportMonthPage
          dataReportByMonth={dataReportByMonth}
          month={month}
          year={year}
        />
      )}
      {tab === "day" && <ReportDayPage dataReportByMonth={dataReportByMonth} />}
      {tab === "year" && (
        <ReportYearPage dataReportByYear={dataReportByYear} year={year} />
      )}
    </div>
  );
}
