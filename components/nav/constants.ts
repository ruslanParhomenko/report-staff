export const REPORT_NAV_ITEMS = [
  { label: "month", value: "month" },
  { label: "day", value: "day" },
  { label: "year", value: "year" },
];

type NAV_BY_PATCH_TYPE = Record<
  string,
  { navItems: PageNavType[]; filterMonth: boolean }
>;

export const NAV_BY_PATCH = {
  report: { navItems: REPORT_NAV_ITEMS, filterMonth: true },
} satisfies NAV_BY_PATCH_TYPE;

export type PageNavType = {
  label: string;
  value: string;
};
