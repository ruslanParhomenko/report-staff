import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { ReportType } from "./schema";
import ReportRowItem from "./report-row-item";

type ReportRowProps = {
  data: UseFieldArrayReturn<ReportType, keyof Omit<ReportType, "date">>;
  form: UseFormReturn<ReportType>;
  arrayName: keyof Omit<ReportType, "date">;
  selectData: string[];
};

export default function ReportRow({
  data,
  form,
  arrayName,
  selectData,
}: ReportRowProps) {
  return (
    <>
      {data.fields.map((_, index) => (
        <ReportRowItem
          key={data.fields[index].id}
          index={index}
          arrayName={arrayName}
          form={form}
          selectData={selectData}
          append={data.append}
          remove={data.remove}
        />
      ))}
    </>
  );
}
