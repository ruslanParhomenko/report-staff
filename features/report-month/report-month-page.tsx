import { DayByMonthTable } from "@/components/table/day-by-month-table";
import { Table } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";
import ReportMonthBody from "./report-month-body";
import { buildProductMatrix } from "@/utils/result-by-month";

export default function ReportMonthPage({
  data,
  month,
  year,
}: {
  data: any[];
  month: string;
  year: string;
}) {
  const { uniqueNames, map, days } = buildProductMatrix(data);

  console.log(uniqueNames, map, days);
  const monthDays = getMonthDays({ month, year });
  return (
    <Table>
      <DayByMonthTable month={month} monthDays={monthDays} />
      <ReportMonthBody data={data} />
    </Table>
  );
}
