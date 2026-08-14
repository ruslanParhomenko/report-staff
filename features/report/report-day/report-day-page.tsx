"use client";

import SelectDay from "@/components/input/select-day";
import { GetReportData } from "../report-form/model/type";
import { getMonthDays } from "@/utils/get-month-days";
import { useState, useTransition } from "react";
import ReportTable from "./report-day-table";
import { useRouter } from "next/navigation";
import RefreshDataButton from "@/components/buttons/refresh-data";

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

  const router = useRouter();
  const [_isPending, startTransition] = useTransition();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().getDate().toString(),
  );

  const selectedDayData = data?.find((day) => day.id === selectedDay) || null;

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    const startTime = Date.now();

    setSelectedDay(new Date().getDate().toString());

    startTransition(() => {
      router.refresh();
    });

    const elapsed = Date.now() - startTime;
    const remaining = Math.max(2000 - elapsed, 0);

    setTimeout(() => {
      setIsRefreshing(false);
    }, remaining);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center justify-center gap-12">
        <SelectDay
          value={selectedDay}
          onChange={setSelectedDay}
          monthDays={monthDays}
        />

        <RefreshDataButton
          handleRefresh={handleRefresh}
          isPending={isRefreshing}
        />
      </div>

      <ReportTable dataByDay={selectedDayData} />
    </div>
  );
}
