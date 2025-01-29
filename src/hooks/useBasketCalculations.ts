import { useMemo } from "react";
import { BasketItem } from "@/types";

import { useFormatCurrency } from "@/hooks";

export const useBasketCalculations = (items: BasketItem[]) => {
  const { formatCurrencyDecimals } = useFormatCurrency();
  const calculateTotal = useMemo(
    () =>
      formatCurrencyDecimals(
        items.reduce((total, item) => total + item.price * item.quantity, 0)
      ),
    [items, formatCurrencyDecimals]
  );

  const calculateSubtotalItem = (id: string) => {
    const item = items.find((st) => st.id === id);
    if (!item) return formatCurrencyDecimals(0);
    return formatCurrencyDecimals(item.price * item.quantity);
  };

  return { calculateTotal, calculateSubtotalItem };
};
