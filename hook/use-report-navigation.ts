import { useRouter } from "next/navigation";
import { formatNow } from "@/utils/format-date";

export function useReportNavigation() {
  const router = useRouter();

  const handleClick = (
    tab: string,
    day?: string,
    month?: string,
    year?: string,
  ) => {
    const { reportDay, year: yearNow, month: monthNow } = formatNow();

    const pushDay = day ?? reportDay;
    const pushMonth = month ?? monthNow;
    const pushYear = year ?? yearNow;

    router.push(
      `/report?tab=${tab}&day=${pushDay}&month=${pushMonth}&year=${pushYear}`,
    );
  };

  return { handleClick };
}
