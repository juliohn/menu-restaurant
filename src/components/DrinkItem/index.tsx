import { DrinkItemprops } from "@/pages/product/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addProduct } from "@/store/basket";

import { formatCurrencyDecimals } from "@/utils";

export function DrinkItem({ item }: DrinkItemprops) {
  const dispatch: AppDispatch = useDispatch();

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
        <h2 className="text-black font-medium text-base">{item.name}</h2>

        {item.description && (
          <div className="truncate-2-lines text-base text-gray400 font-light">
            {item.description}
          </div>
        )}

        <div className=" text-base font-medium text-black">
          {formatCurrencyDecimals(item.price)}
        </div>
      </div>

      <div className="w-2/5 flex rounded-xl items-center justify-end">
        <button
          onClick={handleAddItem}
          className=" bg-brown500 px-4 py-1 text-white font-medium text-base rounded-md"
        >
          +
        </button>
      </div>
    </div>
  );
}
