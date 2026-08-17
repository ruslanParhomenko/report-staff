import { RefreshCw } from "lucide-react";

export default function RefreshDataButton({
  handleRefresh,
  isPending,
}: {
  handleRefresh: () => void;
  isPending: boolean;
}) {
  return (
    <button
      type="button"
      onClick={handleRefresh}
      disabled={isPending}
      className="flex items-center gap-4 text-sm text-red-500 hover:text-red-600 disabled:opacity-50 cursor-pointer"
    >
      <RefreshCw className={`size-3.5 ${isPending ? "animate-spin" : ""}`} />

      <span className="text-xs">
        {isPending ? "Обновление..." : "Обновить данные"}
      </span>
    </button>
  );
}
