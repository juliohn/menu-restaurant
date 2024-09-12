import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Modal } from "@/components/Modal";
import { ResumeBasket } from "@/components/ResumeBasket";

import { X } from "lucide-react";

export default function BasketPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsModalOpen(true);
    }
  }, [router.isReady]);

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="bg-blue10 w-full">
        <div className="w-full bg-white p-4 flex flex-col">
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
}
