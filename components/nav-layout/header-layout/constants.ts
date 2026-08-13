// header bar

import { REPORT_MAIN_ROUTE } from "@/constants/router-tag";
import { Route } from "next";

export const TABS_BY_ROUTE = {
  [REPORT_MAIN_ROUTE]: ["day", "month", "year", "form"],
} as const;

export type NAV_BY_PATCH_TYPE = Record<
  Route,
  {
    tabs: readonly string[];
    selectMonth: boolean;
    selectYear: boolean;
  }
>;

export const NAV_BY_PATCH = {
  [REPORT_MAIN_ROUTE]: {
    tabs: TABS_BY_ROUTE[REPORT_MAIN_ROUTE],
    selectMonth:
      TABS_BY_ROUTE[REPORT_MAIN_ROUTE].includes("month") &&
      TABS_BY_ROUTE[REPORT_MAIN_ROUTE].includes("year"),
    selectYear: TABS_BY_ROUTE[REPORT_MAIN_ROUTE].includes("year"),
  },
} satisfies Partial<NAV_BY_PATCH_TYPE>;
