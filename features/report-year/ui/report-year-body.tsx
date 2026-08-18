"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MONTHS } from "@/utils/get-month-days";

import { useReportNavigation } from "@/hook/use-report-navigation";
import { GetReportData } from "@/features/report-form/model/type";

type Props = {
  data: GetReportData[];
};

export default function ReportYearBody({ data }: Props) {
  const { handleClick } = useReportNavigation();

  const productsByMonth: Record<string, Record<string, number>> = {};

  MONTHS.forEach((month) => {
    productsByMonth[month] = {};
  });

  data.forEach((monthItem) => {
    const month = monthItem.id;
    const products = productsByMonth[month] ?? (productsByMonth[month] = {});

    monthItem.reports.forEach((report) => {
      Object.values(report.data)
        .flat()
        .forEach((product) => {
          if (!product?.name) return;

          products[product.name] =
            (products[product.name] ?? 0) + Number(product.value || 0);
        });
    });
  });

  const uniqueNames = Array.from(
    new Set(
      Object.values(productsByMonth).flatMap((products) =>
        Object.keys(products),
      ),
    ),
  );

  return (
    <TableBody>
      {uniqueNames.map((name) => {
        const total = MONTHS.reduce(
          (sum, month) => sum + (productsByMonth[month]?.[name] ?? 0),
          0,
        );

        return (
          <TableRow key={name} className="h-5 group">
            <TableCell className="px-2 text-xs p-0 sticky left-0 bg-background truncate md:bg-transparent group-hover:text-red-600">
              {name}
            </TableCell>
            <TableCell className="text-center text-xs p-0 font-bold border-l sticky md:left-40 left-30 bg-background md:bg-transparent group-hover:text-red-600">
              {total.toFixed(0) || ""}
            </TableCell>

            {MONTHS.map((month) => {
              const value = productsByMonth[month]?.[name];

              return (
                <TableCell
                  key={`${name}-${month}`}
                  className="text-center text-xs p-0 border-l group-hover:text-red-600 cursor-pointer"
                  onClick={() => handleClick("month", undefined, month)}
                >
                  {value?.toFixed(0) ?? ""}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
