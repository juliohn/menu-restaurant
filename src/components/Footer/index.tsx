import React from "react";
import { useSelector } from "react-redux";

import Link from "next/link";
import { useRouter } from "next/router";

import { RootState } from "@/store";

import { Dot } from "lucide-react";

export function Footer() {
  const router = useRouter();

  const basket = useSelector((state: RootState) => state.basket);
  // - Abre o modal do carrinho no responsivo mobile
  const openBasketModal = () => {
    router.push(`/basket`);
  };

  return (
    <footer className="md:hidden  bg-blue10 mt-4 p-10 items-center">
      <div className="bg-white rounded-md  text-center">
        <Link href={"#"} className="text-bold text-brown500 underline">
          View allergy information
        </Link>
      </div>

      {basket.items.length > 0 && (
        <div className="md:hidden  mt-4 w-full px-4 mb-4">
          <button
            onClick={openBasketModal}
            className="w-full flex justify-center bg-brown500 px-8 py-2  text-white font-bold rounded-3xl"
          >
            Your basket <Dot /> {basket.items.length}{" "}
            {basket.items.length > 1 ? "items" : "item"}
          </button>
        </div>
      )}
    </footer>
  );
}
