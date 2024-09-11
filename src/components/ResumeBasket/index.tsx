import { Minus, Plus, X } from "lucide-react";

export function ResumeBasket() {
  return (
    <div className="w-full bg-white p-4 flex flex-col">
      <div className="flex-grow flex flex-col border-b border-gray5">
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-base font-normal">Smash Brooks</h2>
          <span className="text-base font-medium text-black">R$ 35,00</span>
        </div>
        <p className="font-normal text-base text-gray30">2 meats (+R$35,00)</p>

        <div className="flex  items-center mt-4 mb-8">
          <button
            onClick={() => {}}
            className="bg-brown500
            justify-center
            items-center
            p-1
            rounded-full
            size-6"
          >
            <Minus className="size-4 text-white" />
          </button>
          <span className="mx-6 text-md font-semibold">{2}</span>
          <button
            onClick={() => {}}
            className="bg-brown500
            justify-center
            items-center
            p-1
            rounded-full
            size-6"
          >
            <Plus className="text-white size-4" />
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <div className="flex items-center justify-between mt-2">
          <h2 className="text-base font-normal">Caipirinha</h2>
          <span className="text-base font-medium text-black">R$ 29,00</span>
        </div>

        <div className="flex  items-center mt-4 mb-8">
          <button
            onClick={() => {}}
            className="bg-brown500
            justify-center
            items-center
            p-1
            rounded-full
            size-6"
          >
            <Minus className="size-4 text-white" />
          </button>
          <span className="mx-6 text-md font-semibold">{1}</span>
          <button
            onClick={() => {}}
            className="bg-brown500
            justify-center
            items-center
            p-1
            rounded-full
            size-6"
          >
            <Plus className="text-white size-4" />
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between ">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">R$ 89,90</span>
        </div>
        <div className="flex justify-between border-t border-gray5 mt-4 py-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">R$ 190,90</span>
        </div>
      </div>
    </div>
  );
}
