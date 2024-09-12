import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/router";
import Image from "next/image";

import { RootState, AppDispatch } from "@/store";
import { addProduct } from "@/store/basket";

import { ProductItemOption } from "@/components/ProductItemOption";
import { Modal } from "@/components/Modal";

import { ModifierProps } from "./types";
import { Dot, Minus, Plus, X } from "lucide-react";
import { formatCurrencyDecimals } from "@/utils";

export default function ProductPage() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const currentItem = useSelector((state: RootState) => state.currentItem);
  const { item } = currentItem;
  const modifiers = item!.modifiers[0]!.items;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const modifierInit = {
    id: modifiers[0].id,
    price: modifiers[0].price,
  };

  const [selectedOption, setSelectedOption] = useState<string>(modifierInit.id);

  useEffect(() => {
    if (currentItem == null) {
      closeModal();
    } else {
      if (router.isReady) {
        setIsModalOpen(true);
      }
    }
  }, [currentItem]);

  useEffect(() => {}, [currentItem]);

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  const handleAddItem = () => {
    const option = modifiers.find((md) => md.id === selectedOption);

    const newItem = {
      name: item!.title,
      id: option!.id,
      variant: option!.name,
      price: option!.price,
      quantity,
    };

    dispatch(addProduct(newItem));
    closeModal();
  };

  const handleAddQuantity = () => setQuantity(quantity + 1);
  const handleRemoveQuantity = () =>
    setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleCalculator = () => {
    const item = modifiers!.find((md) => md.id === selectedOption);
    return formatCurrencyDecimals(quantity * item!.price);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className=" w-full h-full flex flex-col">
        <header className="w-full h-64">
          <Image
            className="h-full w-full object-cover"
            src={item!.imageUrl}
            alt=""
            width={390}
            height={265}
          />

          <button
            onClick={closeModal}
            className="absolute top-8 right-4 text-brown500 hover:cursor-point bg-white p-1 rounded-full"
            aria-label="Close Modal"
          >
            <X />
          </button>
        </header>

        <div className="flex flex-col flex-1 overflow-auto p-4">
          <h2 className="text-2xl font-bold mb-2">{item!.title}</h2>
          <p className="text-gray-40 font-normal text-base mb-2">
            {item!.description}
          </p>
          <div className=" mb-2 py-4">
            <p className=" text-gray-40 text-base font-bold">
              Choose your size
            </p>
            <p className=" text-gray-30 font-normal">Select 1 option</p>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            {modifiers!?.map((option: ModifierProps) => {
              return (
                <ProductItemOption
                  key={option.id}
                  name={option.name}
                  price={option.price}
                  isSelected={option.id === selectedOption}
                  handleOptionChange={handleOptionChange}
                  value={option.id}
                />
              );
            })}
          </div>
          <div className="flex justify-center items-center mb-4">
            <button
              onClick={handleRemoveQuantity}
              className="bg-gray10
              justify-center
              items-center
              p-1
              rounded-full"
            >
              <Minus className="text-center" />
            </button>
            <span className="mx-8 text-lg font-semibold">{quantity}</span>
            <button
              onClick={handleAddQuantity}
              className="bg-brown500
              justify-center
              items-center
              p-1
              rounded-full"
            >
              <Plus className="text-white" />
            </button>
          </div>

          <button
            onClick={handleAddItem}
            className="w-full flex justify-center bg-brown500 px-8 py-2  text-white font-bold rounded-3xl"
          >
            Add to Order <Dot /> {handleCalculator()}
          </button>
        </div>
      </div>
    </Modal>
  );
}
