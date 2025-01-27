import { useState, useMemo } from "react";
import { useFormatCurrency } from "@/hooks";
import { ProductProps } from "@/types";
interface UseProductProps {
  product: ProductProps;
  initialQuantity?: number;
}

export function useProduct({ product, initialQuantity = 1 }: UseProductProps) {
  const { formatCurrencyDecimals } = useFormatCurrency();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedOption, setSelectedOption] = useState<string>(
    product.modifiers?.[0]?.items?.[0]?.id?.toString() ?? ""
  );

  const handleAddQuantity = () => setQuantity((prev) => prev + 1);
  const handleRemoveQuantity = () =>
    setQuantity((prev) => Math.max(1, prev - 1));

  const selectedItem = useMemo(
    () =>
      product.modifiers?.[0]?.items?.find(
        (md) => md.id.toString() === selectedOption
      ),
    [selectedOption, product]
  );

  const totalPrice = useMemo(
    () => formatCurrencyDecimals(quantity * (selectedItem?.price ?? 0)),
    [quantity, selectedItem, formatCurrencyDecimals]
  );

  return {
    quantity,
    selectedOption,
    selectedItem,
    totalPrice,
    handleAddQuantity,
    handleRemoveQuantity,
    setSelectedOption,
  };
}
