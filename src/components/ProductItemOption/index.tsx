import { useFormatCurrency } from "@/hooks";

interface ProductItemOptionprops {
  name: string;
  price: number;
  handleOptionChange: (id: string) => void;
  isSelected: boolean;
  value: string;
}
export function ProductItemOption({
  name,
  price,
  handleOptionChange,
  isSelected,
  value,
}: ProductItemOptionprops) {
  const { formatCurrencyDecimals } = useFormatCurrency();

  return (
    <label className="flex items-center py-2 ">
      <div className="flex-grow flex flex-col">
        <p className="font-medium text-black1 text-base">{name}</p>
        <span className="text-gray40 font-normal text-base">
          {formatCurrencyDecimals(price)}
        </span>
      </div>

      <div className="flex flex-col items-end">
        <input
          type="radio"
          name="product-option"
          value={value}
          checked={isSelected}
          onChange={() => handleOptionChange(value.toString())}
          className="appearance-none border-2 border-gray30 rounded-full w-4 h-4 checked:bg-black"
        />
      </div>
    </label>
  );
}
