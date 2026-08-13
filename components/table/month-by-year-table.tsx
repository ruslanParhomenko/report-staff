import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MONTHS } from "@/utils/get-month-days";

const MONTH_LABELS: Record<string, string> = {
  january: "январь",
  february: "февраль",
  march: "март",
  april: "апрель",
  may: "май",
  june: "июнь",
  july: "июль",
  august: "август",
  september: "сентябрь",
  october: "октябрь",
  november: "ноябрь",
  december: "декабрь",
};

export function MonthByYearTable({
  year,
  className,
}: {
  year: string;
  className?: string;
}) {
  if (!year) return null;

  const now = new Date();
  const isCurrentYear = year === String(now.getFullYear());
  const todayMonthIndex = now.getMonth();

  return (
    <TableHeader className="sticky top-0 bg-background z-20">
      <TableRow className="h-9">
        <TableCell className="p-0 px-1 font-bold text-center text-xs w-30">
          {year}
        </TableCell>

        {MONTHS.map((month, index) => {
          const isCurrent = isCurrentYear && index === todayMonthIndex;

          return (
            <TableCell
              key={month}
              className={cn("w-16 cursor-pointer p-0", className)}
            >
              <div
                className={cn(
                  "text-xs text-center text-blue-500",
                  isCurrent && "text-red-600",
                )}
              >
                {MONTH_LABELS[month] ?? month}
              </div>
            </TableCell>
          );
        })}

        <TableCell className="w-16 p-0 border-l">
          <div className="text-xs text-center font-bold">Итого</div>
        </TableCell>
      </TableRow>
    </TableHeader>
  );
}
