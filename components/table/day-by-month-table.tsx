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
    <TableHeader className="sticky top-0 bg-background z-20">
      <TableRow className="h-10">
        <TableCell
          colSpan={2}
          className="p-0 px-1 front-bold text-center text-xs"
        >
          {month?.toLocaleLowerCase()}
        </TableCell>

        {monthDays.map((day) => {
          return (
            <TableCell
              key={day.day}
              className={cn(
                "w-14 cursor-pointer p-0 ",
                day.day === todayDay && "text-rd front-bold",
                className,
              )}
            >
              <div className="text-sm font-semibold text-center">{day.day}</div>
              <div
                className={cn(
                  "text-xs text-muted-foreground text-center",
                  day.day === todayDay && "text-rd",
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
