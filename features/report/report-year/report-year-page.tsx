import { Table } from "@/components/ui/table";

import { GetReportData } from "../report-form/model/type";
import { MonthByYearTable } from "@/components/table/month-by-year-table";
import ReportYearBody from "./report-year-body";

export default function ReportYearPage({
  data,
  year,
}: {
  data: GetReportData[] | null;
  year: string;
}) {
  if (!data)
    return (
      <div className="text-center text-red-600 font-bold my-6">
        нет выданных продуктов
      </div>
    );

  return (
    <Table className="table-fixed">
      <MonthByYearTable year={year} />
      <ReportYearBody data={data} />
    </Table>
  );
}
