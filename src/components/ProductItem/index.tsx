import { useRouter } from "next/router";

import Image from "next/image";

import { ProductProps } from "@/types";

import { formatCurrencyDecimals } from "@/utils";

interface ItemProps {
  item: ProductProps;
}

export function ProductItem({ item }: ItemProps) {
  const router = useRouter();

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
