import { ReportType } from "./schema";

export type ReportFormData = {
  year: string;
  month: string;
  day: string;
  time: string;
  timeMs: number;

  products: ReportType;
};

export type ReportData = {
  time: string;
  timeMs: number;
  data: Record<string, { name: string; value: string }>;
};

export type GetReportData = {
  id: string;
  reports: ReportData[];
};
