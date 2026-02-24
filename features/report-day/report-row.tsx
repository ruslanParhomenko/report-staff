import { UseFormReturn } from "react-hook-form";
import { ReportType } from "./schema";
import ReportRowItem from "./report-row-item";

type ReportRowProps = {
  data: string[];
  form: UseFormReturn<ReportType>;
  arrayName: keyof Omit<ReportType, "date">;
  disabled?: boolean;
};

export default function ReportRow({
  data,
  form,
  arrayName,
  disabled,
}: ReportRowProps) {
  return data.map((_, index) => (
    <ReportRowItem
      key={index}
      index={index}
      arrayName={arrayName}
      form={form}
      disabled={disabled}
    />
  ));
}
