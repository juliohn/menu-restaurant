import Image from "next/image";

interface CategoryProps {
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
}: CategoryProps) {
  return (
    <div
      role="button"
      aria-label={`Categoria ${name}`}
      className="flex-col w-full md:w-[104px] h-[146px] mt-5 px-2 mr-3"
      onClick={() => onClick(id)}
    >
      {/* Div da imagem */}
      <div className="flex w-full items-center h-[82px] justify-center">
        <div
          className={
            isActive
              ? "ring-2 ring-primary ring-offset-2 ring-offset-white rounded-full"
              : ""
          }
        >
          <Image
            className="rounded-full aspect-square object-cover"
            src={imageUrl}
            alt={`Imagem da categoria ${name}`}
            width={74}
            height={74}
          />
        </div>
      </div>
      {/* Div do texto*/}
      <div className="flex w-full flex-col h-[62px] items-center justify-center">
        <span className={isActive ? "font-bold" : ""}>{name}</span>
      </div>
      {/* Div do active*/}
      {isActive && (
        <div className="flex w-full items-center rounded-lg justify-center border-2 border-primary" />
      )}
    </div>
  );
}
