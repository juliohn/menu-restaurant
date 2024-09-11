import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";

import { Minus, Plus, X } from "lucide-react";
import { BurguerItemOption } from "@/components/BurguerItemOption";

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && id) {
      setIsModalOpen(true);
    }
  }, [router.isReady, id]);

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/"); // Navega de volta para a página inicial
  };

  const handleAddQuantity = () => setQuantity(quantity + 1);
  const handleRemoveQuantity = () =>
    setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleOptionChange = (option: string) => setSelectedOption(option);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className=" w-full h-full flex flex-col">
        <header className="w-full h-64">
          <Image
            className="h-full w-full object-cover"
            src="https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbe01b3373.png"
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
          <h2 className="text-2xl font-bold mb-2">Smash Burger</h2>
          <p className="text-gray-40 font-normal text-base mb-2">
            100g pressed hamburger, mozzarella cheese, pickles, red onion,
            grilled bacon and traditional Heinz mayonnaise.
          </p>
          <div className=" mb-2 py-4">
            <p className=" text-gray-40 text-base font-bold">
              Choose your size
            </p>
            <p className=" text-gray-30 font-normal">Select 1 option</p>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            <BurguerItemOption
              title="1 meat"
              price="33,00"
              isSelected={"option1" === selectedOption}
              handleOptionChange={handleOptionChange}
              value="option1"
            />
            <BurguerItemOption
              title="2 meats"
              price="35,00"
              isSelected={"option2" === selectedOption}
              handleOptionChange={handleOptionChange}
              value="option2"
            />
            <BurguerItemOption
              title="3 meats"
              price="37,00"
              isSelected={"option3" === selectedOption}
              handleOptionChange={handleOptionChange}
              value="option3"
            />
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
            onClick={closeModal}
            className="w-full bg-brown500 px-8 py-2  text-white font-bold rounded-3xl"
          >
            Add to Order
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProductPage;
