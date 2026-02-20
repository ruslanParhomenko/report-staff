import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getMonthDays } from "@/utils/get-month-days";

type MatrixMap = Record<string, { day: string; value: string }[]>;

type Props = {
  uniqueNames: string[];
  map: MatrixMap;
  monthDays: ReturnType<typeof getMonthDays>;
};

export default function ReportMonthBody({
  uniqueNames,
  map,
  monthDays,
}: Props) {
  if (!uniqueNames?.length) return null;

  return (
    <TableBody>
      {uniqueNames.map((name) => {
        const valuesByDay = map[name] ?? [];

        return (
          <TableRow key={name} className="h-10">
            <TableCell className="px-2 font-medium text-sm">{name}</TableCell>
            <TableCell />

            {monthDays.map((dayObj) => {
              const found = valuesByDay.find(
                (v) => Number(v.day) === dayObj.day,
              );

              return (
                <TableCell
                  key={`${name}-${dayObj.day}`}
                  className="text-center text-sm"
                >
                  {found?.value ?? ""}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
