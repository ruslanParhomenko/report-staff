import { getReportDate } from "@/features/report/report-form/lib/get-report-date";

import { MONTHS } from "./get-month-days";

type DateType = {
  year: string;
  month: string;
  time: string;
  timeMs: number;
  reportDay: string;
};

export const formatNow = (): DateType => {
  const now = new Date();

  const year = now.getFullYear().toString();
  const month = MONTHS[now.getMonth()];

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const reportDate = getReportDate();
  const reportDay = reportDate.getDate().toString();

  return {
    year,
    month,
    time: `${hours}:${minutes}:${seconds}`,
    timeMs: now.getTime(),
    reportDay,
  };
};
