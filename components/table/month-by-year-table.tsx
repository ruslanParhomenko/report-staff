import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MONTHS } from "@/utils/get-month-days";

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
    <TableHeader>
      <TableRow>
        <TableCell className="p-0 px-1 font-bold text-center text-xs md:w-40 w-30 sticky left-0 bg-background">
          {year}
        </TableCell>

        <TableCell className="md:w-14 w-10 p-0 border-l sticky md:left-40 left-30 bg-background">
          <div className="text-xs text-center font-bold">total</div>
        </TableCell>
        {MONTHS.map((month, index) => {
          const isCurrent = isCurrentYear && index === todayMonthIndex;

          return (
            <TableCell
              key={month}
              className={cn("md:w-14 w-9 cursor-pointer p-0", className)}
            >
              <div
                className={cn(
                  "text-xs text-center text-blue-500",
                  isCurrent && "text-red-600",
                )}
              >
                {month.slice(0, 3)}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
