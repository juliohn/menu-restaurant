import { ChevronUp, ChevronDown } from "lucide-react";
import { MenuSectionProps } from "@types";

export function MenuSection({
  title,
  isExpanded,
  onToggle,
  items,
  ItemComponent,
  filteredItems,
}: MenuSectionProps) {
  return (
    <div className={"w-full p-4 rounded-lg"}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <h1 className="text-black1 font-medium text-2xl">{title}</h1>
        {isExpanded ? (
          <ChevronUp className="text-primary" />
        ) : (
          <ChevronDown className="text-primary" />
        )}
      </div>

      {isExpanded && (
        <div className="h-auto flex flex-col gap-8 mt-8 mb-8">
          {(filteredItems.length > 0 ? filteredItems : items).map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
