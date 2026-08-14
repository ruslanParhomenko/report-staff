import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";
import { GetReportData } from "../report-form/model/type";

type Props = {
  data: GetReportData[];
  monthDays: ReturnType<typeof getMonthDays>;
};

export default function ReportMonthBody({ data, monthDays }: Props) {
  const productsByDay: Record<string, Record<string, number>> = {};

  data.forEach((day) => {
    const products: Record<string, number> = {};

    day.reports.forEach((report) => {
      Object.values(report.data)
        .flat()
        .forEach((product) => {
          if (!product?.name) return;

          products[product.name] =
            (products[product.name] ?? 0) + Number(product.value || 0);
        });
    });

    productsByDay[day.id] = products;
  });
  const uniqueNames = Array.from(
    new Set(
      Object.values(productsByDay).flatMap((products) => Object.keys(products)),
    ),
  );
  return (
    <TableBody>
      {uniqueNames.map((name) => (
        <TableRow key={name} className="h-6">
          <TableCell className="px-2 font-medium text-xs p-0">{name}</TableCell>

          <TableCell />

          {monthDays.map((dayObj) => {
            const value = productsByDay[String(dayObj.day)]?.[name];

            return (
              <TableCell
                key={`${name}-${dayObj.day}`}
                className="text-center text-xs p-0 border-l"
              >
                {value ?? ""}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}
