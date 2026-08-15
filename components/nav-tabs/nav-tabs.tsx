import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function NavTabs<T extends string>({
  navItems,
  activeTab,
  handleTabChange,
  classTrigger,
  disabled,
  classTabs,
}: {
  navItems: readonly T[];
  activeTab: T;
  handleTabChange: (value: T) => void;
  classTrigger?: string;
  disabled?: boolean;
  classTabs?: string;
}) {
  if (!navItems.length) return null;

  const tabsWidth = `w-1/${navItems.length}`;

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        handleTabChange(value as T);
      }}
    >
      <TabsList
        className={cn("order-1 flex h-7 md:order-0 md:gap-4", classTabs)}
      >
        {navItems.map((item, index) => (
          <TabsTrigger
            key={`${item}-${index}`}
            value={item}
            className={cn("cursor-pointer", tabsWidth, classTrigger)}
            disabled={disabled}
          >
            <span
              className={cn(
                "md:text-md  hover:text-rd block truncate text-xs md:min-w-22 w-10",
                item === activeTab ? "text-red-600" : "",
              )}
            >
              {item}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
