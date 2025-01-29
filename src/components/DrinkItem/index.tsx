import { DrinkItemProps } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addProduct } from "@/store/basket";

import { useFormatCurrency } from "@/hooks";

export function DrinkItem({ item }: DrinkItemProps) {
  const dispatch = useAppDispatch();
  const basket = useAppSelector((state) => state.basket);

  const itemQuantity =
    basket.items.find(
      (basketItem) =>
        basketItem.identification_quantity === item.identification_quantity
    )?.quantity || 0;

  const { formatCurrencyDecimals } = useFormatCurrency();

  const handleAddItem = () => {
    const newItem = {
      ...item,
      quantity: 1,
      identification_quantity: Number(item.id),
    };

    dispatch(addProduct(newItem));
  };

  return (
    <div className="flex gap-3 md:mb-10">
      <div className="w-4/5 rounded-lg flex flex-col justify-between">
        <div className="flex items-center gap-2">
          {itemQuantity > 0 && (
            <div className="md:hidden bg-primary w-4 h-4 rounded flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {itemQuantity}
              </span>
            </div>
          )}
          <h2 className="text-black1 font-medium text-base">{item.name}</h2>
        </div>

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
