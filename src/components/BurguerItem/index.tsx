import { useRouter } from "next/router";
import Image from "next/image";

interface BurguerItemprops {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
}
export function BurguerItem({
  title,
  description,
  imageUrl,
  price,
}: BurguerItemprops) {
  const router = useRouter();

  const openProductModal = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="flex gap-3" onClick={() => openProductModal("123")}>
      <div className="w-4/5 rounded-lg flex flex-col">
        <h2 className="text-black font-medium text-base">{title}</h2>

        <div className="truncate-2-lines text-base text-gray400 font-light">
          {description}
        </div>

        <div className=" text-base font-medium text-black">R$ {price}</div>
      </div>

      <div className="w-2/5 border border-gray-200 rounded-lg">
        <Image
          className="h-full w-full object-cover rounded-md"
          src={imageUrl}
          alt=""
          width={128}
          height={85}
        />
      </div>
    </div>
  );
}
