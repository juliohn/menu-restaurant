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

        <div className="truncate-2-lines text-base text-gray400 font-light">
          {item.description}
        </div>

        <div className=" text-base font-medium text-black">
          {formatCurrencyDecimals(item.price)}
        </div>
      </div>

      <div className="w-2/5 border border-gray-200 rounded-lg">
        <Image
          className="h-full w-full object-cover rounded-md"
          src={item.imageUrl}
          alt=""
          width={128}
          height={85}
        />
      </div>
    </div>
  );
}
