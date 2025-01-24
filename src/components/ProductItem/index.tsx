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
    // - navega para rota de detalhe do produto
    router.push(`/product/${item.id}`);
  };

  return (
    <div className="flex gap-3" onClick={() => openProductModal()}>
      <div className="w-4/5 rounded-lg flex flex-col">
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

      <div className="relative min-w-36 min-h-[85px]">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
