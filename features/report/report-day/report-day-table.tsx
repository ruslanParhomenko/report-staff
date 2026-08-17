"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetReportData } from "../report-form/model/type";
import { cn } from "@/lib/utils";

type ProductRow = {
  name: string;
  total: number;
  values: Record<number, number>;
};

export default function ReportTable({
  dataByDay,
}: {
  dataByDay: GetReportData | null;
}) {
  if (!dataByDay?.reports?.length) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        Нет данных
      </div>
    );
  }

  const timeColumnsMap = new Map<number, string>();

  for (const report of dataByDay.reports) {
    if (!timeColumnsMap.has(report.timeMs)) {
      timeColumnsMap.set(report.timeMs, report.time);
    }
  }

  const timeColumns = Array.from(timeColumnsMap, ([timeMs, time]) => ({
    timeMs,
    time,
  })).sort((a, b) => a.timeMs - b.timeMs);

  const productsMap = new Map<string, ProductRow>();

  for (const report of dataByDay.reports) {
    const products = Object.values(report.data).flat();

    for (const product of products) {
      const value = Number(product.value) || 0;

      if (!productsMap.has(product.name)) {
        productsMap.set(product.name, {
          name: product.name,
          total: 0,
          values: {},
        });
      }

      const row = productsMap.get(product.name)!;

      row.total += value;

      row.values[report.timeMs] = (row.values[report.timeMs] ?? 0) + value;
    }
  }

  const products = Array.from(productsMap.values()).sort(
    (a, b) => b.total - a.total,
  );

  return (
    <Table className="border-b">
      <TableHeader>
        <TableRow>
          <TableHead className="sticky left-0 z-10 w-30 md:w-50 truncate bg-background" />

          {timeColumns.map((column) => (
            <TableHead
              key={column.timeMs}
              className="min-w-12 text-center text-xs text-red-600"
            >
              {column.time.slice(0, 5)}
            </TableHead>
          ))}

          <TableHead className="w-15 md:w-25 text-center">total</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name} className="group">
            <TableCell className="sticky left-0 z-10 w-20 md:w-50 text-xs md:text-md  bg-background font-medium truncate md:bg-transparent group-hover:text-red-600">
              {product.name}
            </TableCell>

            {timeColumns.map((column) => {
              const isValue = Boolean(product.values[column.timeMs]);
              return (
                <TableCell
                  key={column.timeMs}
                  className={cn(
                    "min-w-12 text-center border-l group-hover:text-red-600",
                    isValue && "bg-accent",
                  )}
                >
                  {product.values[column.timeMs] ?? ""}
                </TableCell>
              );
            })}

            <TableCell className="w-15 md:w-25 text-center font-semibold border-l">
              {product.total}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
