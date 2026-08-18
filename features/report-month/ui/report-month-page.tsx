import { DayByMonthTable } from "@/components/table/day-by-month-table";
import { Table } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";
import ReportMonthBody from "./report-month-body";
import { GetReportData } from "@/features/report-form/model/type";
import NoProducts from "@/components/pages/no-products";

export function ReportMonthPage({
  dataReportByMonth: data,
  month,
  year,
}: {
  dataReportByMonth: GetReportData[] | null;
  month: string;
  year: string;
}) {
  const monthDays = getMonthDays({ month, year });

  if (!data) return <NoProducts />;
  return (
    <Table className="table-fixed">
      <DayByMonthTable month={month} monthDays={monthDays} />
      <ReportMonthBody
        data={data}
        monthDays={monthDays}
        month={month}
        year={year}
      />
    </Table>
  );
}
