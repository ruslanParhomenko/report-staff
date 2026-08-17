"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import SelectInputWithSearch from "@/components/input/select-input-search";
import NumericInput from "@/components/input/numeric-input";
import { AddRemoveFieldsButton } from "@/components/buttons/action-fields-button";
import { ReportItemType } from "../model/schema";

interface SectionProps {
  title: string;
  fieldArray: any;
  products: string[];
  fieldNamePrefix: string;
  defaultValues: ReportItemType;
  isDisabled: boolean;
}

export default function ReportSection({
  title,
  fieldArray,
  products,
  fieldNamePrefix,
  defaultValues,
  isDisabled,
}: SectionProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h3 className="text-md font-semibold mb-2 text-gray-500">{title}</h3>
      <div className="flex justify-center">
        <Table className="w-auto">
          <TableBody>
            {fieldArray.fields.map((field: any, index: number) => {
              return (
                <TableRow key={field.id} className="border-0">
                  <TableCell className="flex gap-4 items-center justify-center py-0.5 px-4">
                    <SelectInputWithSearch
                      data={products}
                      fieldName={`${fieldNamePrefix}.${index}.name`}
                      className="md:w-80 w-50 shadow-none font-bold h-9 md:text-xl px-4"
                      disabled={isDisabled}
                    />
                    <NumericInput
                      fieldName={`${fieldNamePrefix}.${index}.value`}
                      className="shadow-none font-bold h-9 md:w-20 w-15 md:text-xl!"
                      disabled={isDisabled}
                    />
                    <AddRemoveFieldsButton
                      formField={fieldArray}
                      defaultValues={defaultValues}
                      index={index}
                      limit={2}
                      disabled={isDisabled}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
