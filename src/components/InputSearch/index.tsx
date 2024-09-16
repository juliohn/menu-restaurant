import { Search } from "lucide-react";
import { ChangeEvent } from "react";

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function InputSearch({ value, onChange }: InputProps) {
  return (
    <div className="flex mt-4 w-full item-center gap-2 rounded-lg border border-gray200  px-3 py-2 shadow-sm">
      <Search className="h-5 w-5 text-gray-1200" />
      <input
        value={value}
        onChange={onChange}
        placeholder="Search menu items"
        className="flex-1 border-0 bg-transparent p-0 text-black placeholder-gray-20 focus:outline-none focus:ring-0"
      />
    </div>
  );
}
