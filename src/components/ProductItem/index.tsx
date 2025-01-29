import { useRouter } from "next/router";

import Image from "next/image";

import { ItemProps } from "@/types";

import { useFormatCurrency, useAppSelector } from "@/hooks";

export function ProductItem({ item }: ItemProps) {
  const basket = useAppSelector((state) => state.basket);

  const itemQuantity =
    basket.items.find(
      (basketItem) =>
        basketItem.identification_quantity === item.identification_quantity
    )?.quantity || 0;

  const router = useRouter();

  const { formatCurrencyDecimals } = useFormatCurrency();

  const openProductModal = () => {
    // Navigate to product detail route
    router.push(`/product/${item.id}`);
  };

  return (
    <button
      onClick={openProductModal}
      className="flex gap-3 w-full hover:opacity-90 transition-opacity text-left"
    >
      <div className="w-4/5 rounded-lg flex flex-col">
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

      <div className="relative min-w-36 min-h-[85px]">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          loading="lazy"
          className="object-cover rounded-lg"
        />
      </div>
    </button>
  );
}
