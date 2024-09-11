interface BurguerItemOptionprops {
  title: string;
  price: string;
  handleOptionChange: (id: string) => void;
  isSelected: boolean;
  value: string;
}
export function BurguerItemOption({
  title,
  price,
  handleOptionChange,
  isSelected,
  value,
}: BurguerItemOptionprops) {
  return (
    <label className="flex items-center py-2 ">
      <div className="flex-grow flex flex-col">
        <p className="font-medium text-black text-base">{title}</p>
        <span className="text-gray-40 font-normal text-base">R$ {price}</span>
      </div>

      <div className="flex flex-col items-end">
        <input
          type="radio"
          name="product-option"
          value={value}
          checked={isSelected}
          onChange={() => handleOptionChange(value)}
          className="appearance-none border-2 border-gray30 rounded-full w-4 h-4 checked:bg-black"
        />
      </div>
    </label>
  );
}
