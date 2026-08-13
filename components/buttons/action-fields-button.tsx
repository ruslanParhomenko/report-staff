import { cn } from "@/lib/utils";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { UseFieldArrayReturn } from "react-hook-form";

export function AddRemoveFieldsButton({
  formField,
  defaultValues,
  index,
  disabled = false,
  className,
  limit,
}: {
  formField: UseFieldArrayReturn<any>;
  defaultValues: any;
  index: number;
  disabled?: boolean;
  className?: string;
  limit?: number;
}) {
  const isOnlyOne = formField.fields?.length === 1;
  const isLast = index === formField.fields?.length - 1;

  const isMaxFieldsReached = limit ? formField.fields?.length >= limit : false;

  const handleRemove = () => {
    if (isOnlyOne) {
      formField.replace([defaultValues]);
    } else {
      formField.remove(index);
    }
  };

  return (
    <div
      className={cn(
        "flex items-start justify-center gap-2 md:gap-6",
        className,
      )}
    >
      {(isOnlyOne || isLast) && !isMaxFieldsReached ? (
        <button
          type="button"
          className={cn("h-8")}
          onClick={() => formField.append(defaultValues)}
          disabled={disabled}
        >
          <PlusIcon className="text-blue-600 size-4 cursor-pointer font-bold" />
        </button>
      ) : (
        <div className="h-8 w-4"></div>
      )}
      <button
        type="button"
        className={cn("h-8")}
        onClick={handleRemove}
        disabled={disabled}
      >
        <Trash2Icon className="text-red-600 size-4 cursor-pointer" />
      </button>
    </div>
  );
}
