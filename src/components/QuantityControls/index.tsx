import { Minus, Plus } from "lucide-react";

export type QuantityControlsProps = {
  quantity: number;
  itemName: string;
  onAdd: () => void;
  onRemove: () => void;
  isCart?: boolean;
};

export function QuantityControls({
  quantity,
  itemName,
  onAdd,
  onRemove,
  isCart = true,
}: QuantityControlsProps) {
  return (
    <div className="flex items-center">
      <button
        disabled={quantity < 2}
        onClick={onRemove}
        className={`justify-center items-center p-1 rounded-full ${
          isCart ? "bg-primary" : "bg-gray10"
        } ${isCart ? "size-6" : "size-8"}`}
        aria-label={`Diminuir quantidade de ${itemName}`}
      >
        <Minus
          className={`${isCart ? "text-white" : "text-gray30"} ${
            isCart ? "size-4" : "size-6"
          }`}
        />
      </button>
      <span
        className={`mx-6 text-center font-semibold ${
          isCart ? "w-4 text-md" : "w-6 text-2xl"
        }`}
      >
        {quantity}
      </span>
      <button
        onClick={onAdd}
        className={`bg-primary justify-center items-center p-1 rounded-full ${
          isCart ? "size-6" : "size-8"
        }`}
        aria-label={`Aumentar quantidade de ${itemName}`}
      >
        <Plus className={`text-white ${isCart ? "size-4" : "size-6"}`} />
      </button>
    </div>
  );
}
