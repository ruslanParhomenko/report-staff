import { z } from "zod";

export const valueTimeSchema = z.object({
  time: z.string(),
  value: z.string().regex(/^\d*$/, "ввод -  только цифры"),
});

export const defaultValueTime = Array.from({ length: 8 }, () => ({
  time: "",
  value: "",
}));
export const reportItemSchema = z.object({
  name: z.string(),
  value: z.string(),
  valueByTime: z.array(valueTimeSchema),
});

export type ReportItemType = z.infer<typeof reportItemSchema>;

export const defaultValueItem = {
  name: "",
  value: "",
  valueByTime: defaultValueTime,
};

export const reportSchema = z.object({
  date: z.string(),
  first: z.array(reportItemSchema),
  second: z.array(reportItemSchema),
  snacks: z.array(reportItemSchema),
  deserts: z.array(reportItemSchema),
});

export type ReportType = z.infer<typeof reportSchema>;

export const defaultValueReport = {
  date: new Date().toISOString().split("T")[0],
  first: [defaultValueItem],
  second: [defaultValueItem],
  snacks: [defaultValueItem],
  deserts: [defaultValueItem],
};
