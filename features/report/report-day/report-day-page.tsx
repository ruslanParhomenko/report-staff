"use client";

import SelectDay from "@/components/input/select-day";
import { GetReportData } from "../report-form/model/type";
import { getMonthDays } from "@/utils/get-month-days";
import { useState, useTransition } from "react";
import ReportTable from "./report-day-table";
import { useRouter } from "next/navigation";
import RefreshDataButton from "@/components/buttons/refresh-data";
import { revalidateTagClient } from "@/app/action/revalidate-tag/revalidate-tag";
import { REPORT_STAFF_ACTION_TAG } from "@/constants/action-tag";
import { useSession } from "next-auth/react";
import { formatNow } from "@/utils/format-date";

export default function ReportDayPage({
  dataReportByMonth,
  month,
  year,
}: {
  dataReportByMonth: GetReportData[] | null;
  month: string;
  year: string;
}) {
  const monthDays = getMonthDays({ month, year });

  const { data } = useSession();

  const isAdmin = data?.user?.role === "admin";

  const router = useRouter();
  const [_isPending, startTransition] = useTransition();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { reportDay } = formatNow();

  const [selectedDay, setSelectedDay] = useState<string>(reportDay);

  const selectedDayData =
    dataReportByMonth?.find((day) => day.id === selectedDay) || null;

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setSelectedDay(new Date().getDate().toString());

    startTransition(async () => {
      if (isAdmin) {
        await revalidateTagClient(REPORT_STAFF_ACTION_TAG);
      }
      router.refresh();
    });

    setTimeout(() => setIsRefreshing(false), 1000);
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
