"use client";

import { cn } from "@/lib/utils";
import { getMonthDays, MONTHS, YEAR } from "@/utils/get-month-days";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useEffectEvent, useState, useTransition } from "react";
import { NAV_BY_PATCH } from "./constants";
import NavTabs from "@/components/nav-tabs/nav-tabs";
import SelectOptions from "@/components/input/select-options";
import { useSession } from "next-auth/react";
import { formatNow } from "@/utils/format-date";
import SelectDay from "@/components/input/select-day";

export default function HeaderBar() {
  const pathname = usePathname();
  const mainRoute = pathname.split("/")[1] || "";
  const searchParams = useSearchParams();

  const { data } = useSession();
  const userRole = data?.user?.role;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const config = NAV_BY_PATCH[mainRoute as keyof typeof NAV_BY_PATCH];

  const selectMonth = config?.selectMonth;
  const selectYear = config?.selectYear;
  const selectDate = selectMonth || selectYear;

  const navItems: readonly string[] = config?.tabs ?? [];

  const defaultTab = userRole === "cucina" ? "form" : "day";
  const activeTab = searchParams.get("tab") || defaultTab;

  const urlMonth = searchParams.get("month");
  const urlYear = searchParams.get("year");
  const urlDay = searchParams.get("day");

  const { reportDay, month: reportMonth, year: reportYear } = formatNow();

  const [day, setDay] = useState(() => urlDay || reportDay);
  const [month, setMonth] = useState(() => urlMonth || reportMonth);
  const [year, setYear] = useState(() => urlYear || reportYear);

  // Синхронизируем activeTab в URL при старте приложения
  useEffect(() => {
    const hasTab = searchParams.has("tab");
    if (!hasTab) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", defaultTab);
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }
  }, [defaultTab, searchParams, pathname, router]);

  useEffect(() => {
    if (!selectDate) return;
    setDay(urlDay || reportDay);
    setMonth(urlMonth || reportMonth);
    setYear(urlYear || reportYear);
  }, [
    pathname,
    urlDay,
    urlMonth,
    urlYear,
    selectDate,
    reportDay,
    reportMonth,
    reportYear,
  ]);

  const onSyncParams = useEffectEvent(
    (tab: string, d: string, m: string, y: string) => {
      const params = new URLSearchParams(searchParams.toString());

      const currentDay = params.get("day");
      const currentMonth = params.get("month");
      const currentYear = params.get("year");

      const dateSynced =
        currentDay === d && currentMonth === m && currentYear === y;

      if (dateSynced) return;

      params.set("day", d);
      params.set("month", m);
      params.set("year", y);

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
  );

  useEffect(() => {
    if (!selectDate) return;
    onSyncParams(activeTab, day, month, year);
  }, [day, month, year, selectDate, activeTab]);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const monthDays = getMonthDays({ month, year });

  const selectClassName =
    "md:w-24 w-10 h-6! md:border-border/30 px-1 rounded-md md:text-md text-xs bg-border/30";

  return (
    <div
      className={cn(
        "bg-background sticky top-0 z-10 flex items-center gap-1 py-3 md:flex-row justify-between md:gap-2 md:px-4",
        navItems.length < 9 ? "flex-row" : "flex-col",
      )}
    >
      <NavTabs
        navItems={navItems}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        disabled={isPending}
        classTrigger="h-5.5 md:h-6"
        classTabs="h-6! md:h-7!"
      />

      {selectDate && (
        <div className="flex justify-center md:gap-4 gap-2 md:justify-end">
          <SelectDay
            value={day}
            onChange={setDay}
            monthDays={monthDays}
            className={selectClassName}
          />
          <SelectOptions
            options={MONTHS.map((month) => ({
              value: month,
              label: month,
            }))}
            value={month}
            onChange={setMonth}
            className={selectClassName}
          />
          <SelectOptions
            options={YEAR.map((year) => ({ value: year, label: year }))}
            value={year}
            onChange={setYear}
            className={selectClassName}
          />
        </div>
      )}
    </div>
  );
}
