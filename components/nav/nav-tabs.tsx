"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

import { cn } from "@/lib/utils";
import { NAV_BY_PATCH } from "./constants";
import { MONTHS } from "@/utils/get-month-days";
import SelectByMonthYear from "./select-month-year";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function NavTabs() {
  const session = useSession();
  const role = session.data?.user?.role;
  const isAdmin = role === "ADMIN";

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const STORAGE_KEY = `nav-tab-${pathname}`;

  const config =
    NAV_BY_PATCH[pathname.split("/")[1] as keyof typeof NAV_BY_PATCH];

  const filterType = config?.filterMonth;
  const navItems = config?.navItems ?? [];

  // 🔑 фильтр табов
  const filteredNavItems = isAdmin
    ? navItems
    : navItems.filter((item) => item.value === "day");

  // ---------------- MONTH STATE
  const defaultMonth =
    searchParams.get("month") || MONTHS[new Date().getMonth()];

  const [month, setMonth] = useState(defaultMonth);

  // ---------------- ГАРАНТИЯ: month всегда есть в URL
  useEffect(() => {
    if (!filterType) return;

    const params = new URLSearchParams(searchParams.toString());

    if (params.has("month")) return;

    params.set("month", MONTHS[new Date().getMonth()]);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  }, [filterType, pathname, router, searchParams]);

  // ---------------- TAB LOGIC
  const tabFromUrl = searchParams.get("tab");

  const isValidTab = filteredNavItems.some((item) => item.value === tabFromUrl);

  const defaultTab = filteredNavItems[0]?.value;

  const currentTab = tabFromUrl && isValidTab ? tabFromUrl : defaultTab;

  useEffect(() => {
    if (!defaultTab) return;

    if (tabFromUrl && isValidTab) {
      localStorage.setItem(STORAGE_KEY, tabFromUrl);
      return;
    }

    const storedTab = localStorage.getItem(STORAGE_KEY);

    const validStored =
      storedTab && filteredNavItems.some((i) => i.value === storedTab)
        ? storedTab
        : null;

    const tabToUse = validStored ?? defaultTab;

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabToUse);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  }, [
    tabFromUrl,
    isValidTab,
    defaultTab,
    pathname,
    router,
    searchParams,
    filteredNavItems,
  ]);

  // ---------------- MONTH: загрузка из URL (только ADMIN)
  useEffect(() => {
    if (!filterType || !isAdmin) return;

    const monthFromUrl = searchParams.get("month");
    if (monthFromUrl) setMonth(monthFromUrl);
  }, [filterType, searchParams, isAdmin]);

  // ---------------- MONTH: sync → URL (только ADMIN)
  useEffect(() => {
    if (!filterType || !isAdmin) return;

    const params = new URLSearchParams(searchParams.toString());
    const currentMonth = params.get("month");

    if (currentMonth === month) return;

    params.set("month", month);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  }, [month, filterType, pathname, router, isAdmin]);

  // ---------------- TAB CHANGE
  const handleTabChange = (value: string) => {
    localStorage.setItem(STORAGE_KEY, value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  const tabsWidth = `w-1/${filteredNavItems.length}`;

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleTabChange}
      className="sticky top-0 bg-background z-30"
    >
      <div className="flex justify-between mt-0.5 md:px-4">
        {filteredNavItems.length > 0 && (
          <TabsList className="flex md:gap-4 h-7!">
            {filteredNavItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={cn("hover:text-bl cursor-pointer", tabsWidth)}
                disabled={isPending}
              >
                <span className="truncate block md:min-w-20 w-14 text-xs md:text-md text-bl">
                  {item.label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        <div />

        <div className="flex justify-end gap-4">
          {/* только ADMIN */}
          {filterType && isAdmin && (
            <SelectByMonthYear
              month={month}
              setMonth={setMonth}
              isLoading={isPending}
              classNameMonthYear={
                filteredNavItems.length > 0 ? "md:w-22 w-10" : "w-24"
              }
              disabled={isPending}
            />
          )}

          <button onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Tabs>
  );
}
