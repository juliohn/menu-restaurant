import Image from "next/image";

interface categoryProps {
  id: string;
  imageUrl: string;
  name: string;
  isActive?: boolean;
  onClick: (id: string) => void;
}

export function Category({
  id,
  imageUrl,
  name,
  onClick,
  isActive = false,
}: categoryProps) {
  return (
    <div
      className="flex-col justify-between  w-full h-44 mt-5"
      onClick={() => onClick(id)}
    >
      {/* Div da imagem */}
      <div className="flex w-full items-center justify-center">
        <Image
          className="rounded-full aspect-square object-cover"
          src={imageUrl}
          alt=""
          width={72}
          height={72}
          style={{ objectFit: "cover" }}
        />
      </div>
      {/* Div do texto*/}
      <div className="flex w-full mt-10  items-center justify-center">
        <span>{name}</span>
      </div>
      {/* Div do active*/}
      {isActive && (
        <div
          className="
            flex
            mt-6
            px-4
            mx-4
            item-center
            rounded-lg
            justify-center
            border-2
            border-black"
        />
      )}
    </div>
  );
}
