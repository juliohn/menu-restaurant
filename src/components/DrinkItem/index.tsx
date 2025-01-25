import { DrinkItemProps } from "@/types";
import { useAppDispatch } from "@/hooks";
import { addProduct } from "@/store/basket";

import { formatCurrencyDecimals } from "@/utils";

export function DrinkItem({ item }: DrinkItemProps) {
  const dispatch = useAppDispatch();

  const handleAddItem = () => {
    const newItem = {
      ...item,
      quantity: 1,
    };

    dispatch(addProduct(newItem));
  };
  return (
    <div className="flex gap-3 md:mb-10">
      <div className="w-4/5 rounded-lg flex flex-col justify-between">
        <h2 className="text-black1 font-medium text-base">{item.name}</h2>

        {item.description && (
          <div className="truncate-2-lines text-base text-gray40 font-light">
            {item.description}
          </div>
        )}

        <div className="text-base font-medium text-gray40">
          {formatCurrencyDecimals(item.price)}
        </div>
      </div>

      <div className="w-2/5 flex rounded-xl items-center justify-end">
        <button
          onClick={handleAddItem}
          aria-label={`Adicionar ${item.name} ao carrinho`}
          className="bg-brown500 px-4 py-1 text-white font-medium text-base rounded-md hover:bg-brown600 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
