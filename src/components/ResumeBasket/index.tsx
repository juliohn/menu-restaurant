import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "@/store";
import {
  addProduct,
  BasketItem,
  removeProduct,
  deleteProduct,
} from "@/store/basket";

import { Minus, Plus, Trash } from "lucide-react";

import { formatCurrencyDecimals } from "@/utils";

export function ResumeBasket() {
  const dispatch: AppDispatch = useDispatch();

  const basket = useSelector((state: RootState) => state.basket);

  const items = basket.items;

  const handleAddItem = (item: BasketItem) => {
    dispatch(addProduct(item));
  };

  const handleRemoveItem = (item: BasketItem) => {
    dispatch(removeProduct(item));
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id.toString()));
  };

  const calculateTotal = () => {
    return formatCurrencyDecimals(
      items.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  };

  const calculateSubtotalItem = (id: string) => {
    const item = items.find((st) => st.id === id);
    return formatCurrencyDecimals(item!.price * item!.quantity);
  };

  return (
    <div className="w-full bg-white flex flex-col md:p-4">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className="flex-grow flex flex-col border-b border-gray5"
          >
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-base font-normal">{item.name}</h2>
              <span className="text-base font-medium text-black">
                {calculateSubtotalItem(item.id)}
              </span>
            </div>

            {item.variant && (
              <p className="font-normal text-base text-gray30">
                {item.variant} ({formatCurrencyDecimals(item.price)})
              </p>
            )}

            <div className="flex justify-between items-center mt-4 mb-8">
              <div>
                <button
                  disabled={item.quantity < 2}
                  onClick={() => handleRemoveItem(item)}
                  className="bg-brown500 justify-center items-center p-1 rounded-full size-6"
                >
                  <Minus className="size-4 text-white" />
                </button>
                <span className="w-4 mx-6 text-center text-md font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleAddItem({ ...item, quantity: 1 })}
                  className="bg-brown500 justify-center items-center p-1 rounded-full size-6"
                >
                  <Plus className="text-white size-4" />
                </button>
              </div>

              <button onClick={() => handleDeleteProduct(item.id)}>
                <Trash className="text-red-600" />
              </button>
            </div>
          </div>
        );
      })}

      <div>
        <div className="flex justify-between mt-2 py-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">R$ {calculateTotal()}</span>
        </div>
        <div className="flex justify-between border-t border-gray5 mt-4 py-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">R$ {calculateTotal()}</span>
        </div>
      </div>
    </div>
  );
}
