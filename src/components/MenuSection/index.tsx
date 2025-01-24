import { ChevronUp, ChevronDown } from "lucide-react";
import { ProductProps } from "../../types";

interface MenuSectionProps {
  sectionId: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  items: ProductProps[];
  ItemComponent: React.ComponentType<{ item: ProductProps }>;
  filteredItems: ProductProps[];
}

export function MenuSection({
  sectionId,
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
        <h1 className="text-black font-medium text-2xl">{title}</h1>
        {isExpanded ? (
          <ChevronUp className="text-black" />
        ) : (
          <ChevronDown className="text-black" />
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
