import Image from "next/image";
interface BurguerItemprops {
  title: string;
  description?: string;
  price: string;
}
export function DrinkItem({ title, description, price }: BurguerItemprops) {
  return (
    <div className="flex gap-3 md:mb-10">
      <div className="w-4/5 rounded-lg flex flex-col justify-between">
        <h2 className="text-black font-medium text-base">{title}</h2>

        {description && (
          <div className="truncate-2-lines text-base text-gray400 font-light">
            {description}
          </div>
        )}

        <div className=" text-base font-medium text-black">R$ {price}</div>
      </div>

      <div className="w-2/5 flex rounded-xl items-center justify-center">
        <button
          onClick={() => alert("add to cart")}
          className=" bg-brown500 px-4 py-1 text-white font-medium text-base rounded-md"
        >
          +
        </button>
      </div>
    </div>
  );
}
