import { z } from "zod";

export const reportItemSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export type ReportItemType = z.infer<typeof reportItemSchema>;

export const defaultValueItem = {
  name: "",
  value: "",
};

export const reportSchema = z.object({
  first: z.array(reportItemSchema),
  second: z.array(reportItemSchema),
  garnish: z.array(reportItemSchema),
  deserts: z.array(reportItemSchema),
  buffet: z.array(reportItemSchema),
});

export type ReportType = z.infer<typeof reportSchema>;

export const defaultValueReport = {
  first: [defaultValueItem],
  second: [defaultValueItem],
  deserts: [defaultValueItem],
  garnish: [defaultValueItem],
  buffet: [defaultValueItem],
};
