import { Table } from "@/components/ui/table";

import { GetReportData } from "../../report-form/model/type";
import { MonthByYearTable } from "@/components/table/month-by-year-table";
import ReportYearBody from "./report-year-body";
import NoProducts from "@/components/pages/no-products";

export function ReportYearPage({
  dataReportByYear: data,
  year,
}: {
  dataReportByYear: GetReportData[];
  year: string;
}) {
  if (!data) return <NoProducts />;

  return (
    <Table className="table-fixed">
      <MonthByYearTable year={year} />
      <ReportYearBody data={data} />
    </Table>
  );
}
