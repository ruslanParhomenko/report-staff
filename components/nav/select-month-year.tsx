import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS } from "@/utils/get-month-days";

export default function SelectByMonthYear({
  month,
  setMonth,
  isLoading,
  classNameMonthYear,
  disabled,
}: {
  month: string;
  setMonth: (value: string) => void;
  isLoading?: boolean;
  classNameMonthYear?: string;
  disabled: boolean;
}) {
  const classNameSelect = `md:w-24 ${
    classNameMonthYear ? classNameMonthYear : "w-14"
  } h-7! border-0 md:border p-1 rounded-full text-bl md:text-md text-xs  [&>svg]:hidden justify-center`;
  return (
    <div className="flex justify-center items-center md:gap-4 gap-1 order-2">
      <Select
        value={month}
        onValueChange={(value) => setMonth(value)}
        disabled={isLoading || disabled}
      >
        <SelectTrigger className={classNameSelect}>
          <SelectValue placeholder="month" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
