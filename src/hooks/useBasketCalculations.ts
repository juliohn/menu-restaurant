import { useMemo } from "react";
import { BasketItem } from "@/store/basket";
import { formatCurrencyDecimals } from "@/utils";

export const useBasketCalculations = (items: BasketItem[]) => {
  const calculateTotal = useMemo(
    () =>
      formatCurrencyDecimals(
        items.reduce((total, item) => total + item.price * item.quantity, 0)
      ),
    [items]
  );

  const calculateSubtotalItem = (id: string) => {
    const item = items.find((st) => st.id === id);
    if (!item) return formatCurrencyDecimals(0);
    return formatCurrencyDecimals(item.price * item.quantity);
  };

  return { calculateTotal, calculateSubtotalItem };
};
