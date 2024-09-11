// pages/basket.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";

import { X } from "lucide-react";
import { ResumeBasket } from "@/components/ResumeBasket";

const BasketPage: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [itemPrice] = useState(29.99); // Exemplo de preço
  const [subtotal, setSubtotal] = useState(itemPrice * quantity);

  useEffect(() => {
    // Verifique se a rota está pronta e defina o modal como aberto
    if (router.isReady) {
      setIsModalOpen(true);
    }
  }, [router.isReady]);

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/"); // Navegar para a página inicial ou outra página
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    setSubtotal(itemPrice * (quantity + 1));
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setSubtotal(itemPrice * (quantity - 1));
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="bg-blue10 w-full">
        <div className="w-full bg-white p-4 flex flex-col">
          {/* Header */}
          <div className="p-2 border-b border-gray5">
            <h1 className="text-lg font-medium text-center">Basket</h1>
            <button
              onClick={closeModal}
              className="absolute right-4 top-6 text-gray-600 hover:text-gray-900"
              aria-label="Close"
            >
              <X />
            </button>
          </div>

          <ResumeBasket />
        </div>
      </div>
    </Modal>
  );
};

export default BasketPage;
