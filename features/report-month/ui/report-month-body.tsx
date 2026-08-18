"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";

import { useReportNavigation } from "@/hook/use-report-navigation";
import { GetReportData } from "@/features/report-form/model/type";

type Props = {
  data: GetReportData[];
  monthDays: ReturnType<typeof getMonthDays>;
  month: string;
  year: string;
};

export default function ReportMonthBody({
  data,
  monthDays,
  month,
  year,
}: Props) {
  const { handleClick } = useReportNavigation();

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
          <TableRow key={name} className="h-5 group">
            <TableCell className="px-2 font-medium text-xs p-0 sticky left-0 bg-background truncate group-hover:text-red-600 md:bg-transparent">
              {name}
            </TableCell>

            <TableCell className="text-center text-xs p-0 font-bold border-l sticky md:left-40 left-30 bg-background md:bg-transparent group-hover:text-red-600">
              {total || ""}
            </TableCell>

            {monthDays.map((dayObj) => {
              const value = productsByDay[String(dayObj.day)]?.[name];

              const day = dayObj.day.toString();

              return (
                <TableCell
                  key={`${name}-${dayObj.day}`}
                  className="text-center text-xs p-0 border-l cursor-pointer group-hover:text-red-600 hover:text-green-600!"
                  onClick={() => handleClick("day", day, month, year)}
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
