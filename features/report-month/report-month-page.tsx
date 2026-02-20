import { DayByMonthTable } from "@/components/table/day-by-month-table";
import { Table } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";
import ReportMonthBody from "./report-month-body";
import { buildProductMatrix } from "@/utils/result-by-month";
import { GetReportType } from "@/app/action/report/report-action";

export default function ReportMonthPage({
  data,
  month,
  year,
}: {
  data: GetReportType | null;
  month: string;
  year: string;
}) {
  console.log(data);
  const { uniqueNames, map, days } = buildProductMatrix(data);

  console.log(uniqueNames, map, days);
  const monthDays = getMonthDays({ month, year });
  return (
    <Table>
      <DayByMonthTable month={month} monthDays={monthDays} />
      <ReportMonthBody
        uniqueNames={uniqueNames}
        map={map}
        monthDays={monthDays}
      />
    </Table>
  );
}
