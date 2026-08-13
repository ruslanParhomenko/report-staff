"use client";

import SelectDay from "@/components/input/select-day";
import { GetReportData } from "../report-form/model/type";
import { getMonthDays } from "@/utils/get-month-days";
import { useState } from "react";
import ReportTable from "./report-day-table";

export default function ReportDayPage({
  data,
  month,
  year,
}: {
  data: GetReportData[] | null;
  month: string;
  year: string;
}) {
  const monthDays = getMonthDays({ month, year });

  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().getDate().toString(),
  );

  const selectedDayData = data?.find((day) => day.id === selectedDay) || null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-8">
        <SelectDay
          value={selectedDay}
          onChange={setSelectedDay}
          monthDays={monthDays}
        />
      </div>

      <ReportTable dataByDay={selectedDayData} />
    </div>
  );
}
