import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useRouter } from "next/router";

import { RootState } from "@/store";

import { Dot } from "lucide-react";

export function Footer() {
  const router = useRouter();
  const { t } = useTranslation();

  const basket = useSelector((state: RootState) => state.basket);
  // - Abre o modal do carrinho no responsivo mobile
  const openBasketModal = () => {
    router.push(`/basket`);
  };

  const openAllergyModal = () => {
    router.push(`/allergy`);
  };

  // Only render the footer if we're on the home page ('/')
  if (router.pathname !== "/") {
    return null;
  }

  return (
    <footer className="md:hidden  bg-gray5 mt-4 p-10 items-center">
      <div className="bg-white rounded-md  text-center mb-6">
        <button
          onClick={openAllergyModal}
          className="text-bold text-primary underline text-base"
        >
          {t("view_allergy_information")}
        </button>
      </div>

      {basket.items.length > 0 && (
        <div className="md:hidden  mt-4 w-full px-4 mb-4">
          <button
            onClick={openBasketModal}
            className="w-full flex justify-center bg-brown500 px-8 py-2  text-white font-bold rounded-3xl"
          >
            {t("your_basket")} <Dot /> {basket.items.length}{" "}
            {t("basket.items", { count: basket.items.length })}
          </button>
        </div>
      )}
    </footer>
  );
}
