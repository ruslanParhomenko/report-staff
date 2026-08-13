import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MONTHS } from "@/utils/get-month-days";
import { GetReportData } from "../report-form/model/type";

type Props = {
  data: GetReportData[];
};

export default function ReportYearBody({ data }: Props) {
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
          <TableRow key={name} className="h-6">
            <TableCell className="px-2 font-medium text-xs p-0">
              {name}
            </TableCell>

            {MONTHS.map((month) => {
              const value = productsByMonth[month]?.[name];

              return (
                <TableCell
                  key={`${name}-${month}`}
                  className="text-center text-xs p-0 border-l"
                >
                  {value ?? ""}
                </TableCell>
              );
            })}

            <TableCell className="text-center text-xs p-0 font-bold border-l">
              {total || ""}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
