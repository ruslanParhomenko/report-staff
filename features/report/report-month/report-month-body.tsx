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
      {uniqueNames.map((name) => {
        const total = Object.values(productsByDay).reduce(
          (acc, products) => acc + (products[name] ?? 0),
          0,
        );

        return (
          <TableRow key={name} className="h-6">
            <TableCell className="px-2 font-medium text-xs p-0 sticky left-0 bg-background truncate">
              {name}
            </TableCell>

            <TableCell className="text-center text-xs p-0 font-bold border-l sticky md:left-40 left-30 bg-background">
              {total || ""}
            </TableCell>

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
        );
      })}
    </TableBody>
  );
}
