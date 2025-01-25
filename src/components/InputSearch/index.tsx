import { Search } from "lucide-react";
import { ChangeEvent, memo } from "react";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function InputSearchComponent({ value, onChange, ...props }: InputProps) {
  return (
    <div className="flex mt-4 w-full item-center gap-2 bg-white rounded-lg border border-gray20 px-3 py-2 shadow-sm">
      <Search className="h-5 w-5 text-gray20" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search menu items"
        aria-label="Search menu items"
        data-testid="search-input"
        className="flex-1 border-0 bg-transparent p-0 text-black2 placeholder-black focus:outline-none focus:ring-0"
        {...props}
      />
    </div>
  );
}

export const InputSearch = memo(InputSearchComponent);
