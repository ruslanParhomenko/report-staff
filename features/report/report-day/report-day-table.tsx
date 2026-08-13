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
          <TableHead className="sticky left-0 z-10 min-w-55  bg-background" />

          {timeColumns.map((column) => (
            <TableHead
              key={column.timeMs}
              className="min-w-25  text-center text-xs text-red-600"
            >
              {column.time}
            </TableHead>
          ))}

          <TableHead className="min-w-25 text-center">всего</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell className="sticky left-0 z-10 bg-background font-medium">
              {product.name}
            </TableCell>

            {timeColumns.map((column) => (
              <TableCell key={column.timeMs} className="text-center border-l">
                {product.values[column.timeMs] ?? ""}
              </TableCell>
            ))}

            <TableCell className="text-center font-semibold border-l">
              {product.total}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
