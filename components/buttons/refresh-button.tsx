"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import RefreshDataButton from "@/components/buttons/refresh-data";
import { revalidateTagClient } from "@/app/action/revalidate-tag/revalidate-tag";
import { REPORT_STAFF_ACTION_TAG } from "@/constants/action-tag";
import { formatNow } from "@/utils/format-date";

export default function RefreshButton({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [_isPending, startTransition] = useTransition();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    const { reportDay, year, month } = formatNow();

    const params = new URLSearchParams(searchParams.toString());
    params.set("day", reportDay);
    params.set("year", year);
    params.set("month", month);

    router.push(`?${params.toString()}`);

    startTransition(async () => {
      if (isAdmin) {
        await revalidateTagClient(REPORT_STAFF_ACTION_TAG);
        await revalidateTagClient("data-products");
      }
      router.refresh();
    });

    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <RefreshDataButton
        handleRefresh={handleRefresh}
        isPending={isRefreshing}
      />
    </div>
  );
}
