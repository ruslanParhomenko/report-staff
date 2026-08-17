import { DayByMonthTable } from "@/components/table/day-by-month-table";
import { Table } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";
import ReportMonthBody from "./report-month-body";
import { GetReportData } from "../report-form/model/type";

export default function ReportMonthPage({
  data,
  month,
  year,
}: {
  data: GetReportData[] | null;
  month: string;
  year: string;
}) {
  const monthDays = getMonthDays({ month, year });

  if (!data)
    return (
      <div className="text-center text-red-600 font-bold my-6">
        нет выданных продуктов
      </div>
    );
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
