import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getMonthDays } from "@/utils/get-month-days";

export function DayByMonthTable({
  month,
  monthDays,
  className,
}: {
  month: string;
  monthDays: ReturnType<typeof getMonthDays>;
  className?: string;
}) {
  if (!month || !monthDays) return null;

  const todayDay = new Date().getDate();
  return (
    <TableHeader>
      <TableRow className="h-9">
        <TableCell className="p-0 px-1 front-bold text-center text-xs md:w-40 w-30 sticky left-0 bg-background">
          {month?.toLocaleLowerCase()}
        </TableCell>
        <TableCell className="md:w-16 w-10 p-0 border-l sticky md:left-40 left-29 bg-background">
          <div className="text-xs text-center font-bold">total</div>
        </TableCell>

        {monthDays.map((day) => {
          return (
            <TableCell
              key={day.day}
              className={cn("md:w-12 w-9 cursor-pointer p-0", className)}
            >
              <div
                className={cn(
                  "text-xs text-center text-blue-500",
                  day.day === todayDay && "text-red-600",
                )}
              >
                {day.day}
              </div>
              <div
                className={cn(
                  "text-xs text-muted-foreground text-center",
                  day.day === todayDay && "text-red-600",
                )}
              >
                {day.weekday}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}
