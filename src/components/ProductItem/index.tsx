import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import Image from "next/image";

import { AppDispatch } from "@/store";
import { setCurrentItem } from "@/store/currentItem";

import { ProductProps } from "@/pages/product/types";

interface ItemProps {
  item: ProductProps;
}

export function ProductItem({ item }: ItemProps) {
  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();

  const openProductModal = () => {
    // - setCurrentItem pelo redux
    dispatch(setCurrentItem(item));

    // - navega para rota de detalhe do produto
    router.push(`/product`);
  };

  return (
    <div className="flex gap-3" onClick={() => openProductModal()}>
      <div className="w-4/5 rounded-lg flex flex-col">
        <h2 className="text-black font-medium text-base">{item.name}</h2>

        <div className="truncate-2-lines text-base text-gray400 font-light">
          {item.description}
        </div>

        <div className=" text-base font-medium text-black">R$ {item.price}</div>
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
