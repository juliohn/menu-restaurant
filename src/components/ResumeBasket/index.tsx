import { useAppSelector, useAppDispatch } from "@/hooks";

import {
  BasketItem,
  addProduct,
  removeProduct,
  deleteProduct,
} from "@/store/basket";

import { Minus, Plus, Trash } from "lucide-react";

import { formatCurrencyDecimals } from "@/utils";

import { useBasketCalculations } from "@/hooks/useBasketCalculations";

import { QuantityControls } from "@/components/QuantityControls";

export function ResumeBasket() {
  const dispatch = useAppDispatch();

  const basket = useAppSelector((state) => state.basket);

  const items = basket.items;

  const { calculateTotal, calculateSubtotalItem } =
    useBasketCalculations(items);

  const handleAddItem = (item: BasketItem) => {
    dispatch(addProduct(item));
  };

  const handleRemoveItem = (item: BasketItem) => {
    dispatch(removeProduct(item));
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id.toString()));
  };

  return (
    <div className="w-full flex flex-col bg-blue10 ">
      {items.length === 0 ? (
        <div className="p-4 md:text-start text-center  h-16 text-gray-20 bg-white">
          Seu carrinho está vazio
        </div>
      ) : (
        <>
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className="flex-grow flex flex-col md:px-4 py-2"
              >
                <div className="flex items-center  justify-between mt-2">
                  <h2 className="text-base font-normal">{item.name}</h2>
                  <span className="text-base font-medium text-black2">
                    {calculateSubtotalItem(item.id)}
                  </span>
                </div>

                {item.variant && (
                  <p className="font-normal text-base text-gray30">
                    {item.variant} ({formatCurrencyDecimals(item.price)})
                  </p>
                )}

                <div className="flex justify-between items-center mt-4 mb-8">
                  <QuantityControls
                    isCart
                    quantity={item.quantity}
                    itemName={item.name}
                    onAdd={() => handleAddItem({ ...item, quantity: 1 })}
                    onRemove={() => handleRemoveItem(item)}
                  />

                  <button
                    onClick={() => handleDeleteProduct(item.id)}
                    aria-label={`Remover ${item.name} do carrinho`}
                  >
                    <Trash className="text-red-600" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="md:p-4">
            <div className="flex justify-between mt-2 py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">R$ {calculateTotal}</span>
            </div>
            <div className="flex justify-between border-t border-gray5 mt-4 py-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">R$ {calculateTotal}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
