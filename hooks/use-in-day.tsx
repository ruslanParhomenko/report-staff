"use client";
import { isInOperationalDay } from "@/utils/is-in-day";
import { useEffect, useState } from "react";

export function useOperationalDayCheck(date: Date | string) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    function check() {
      setIsValid(isInOperationalDay(date));
    }

    check();

    const interval = setInterval(check, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [date]);

  return isValid;
}
