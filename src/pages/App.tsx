import "@/styles/globals.css";

import { Provider as ReduxProvider, useSelector } from "react-redux";
import { store } from "@/store";
import { RootState } from "@/store";

import type { AppProps } from "next/app";

import { useRouter } from "next/router";

import { Header } from "@/components/header";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

import { Dot } from "lucide-react";

export default function App({ Component, pageProps }: AppProps) {
  const basket = useSelector((state: RootState) => state.basket);

  const router = useRouter();

  // - Abre o modal do carrinho
  const openBasketModal = () => {
    router.push(`/basket`);
  };

  return (
    <ReduxProvider store={store}>
      <Nav />
      <div className="mt-16 w-full">
        <Header />
      </div>
      <div className="px-4 md:bg-blue10 items-center justify-center w-full mx-auto max-w-screen-lg .scrollbar-hidden flex-grow">
        <Component {...pageProps} />
      </div>

      <Footer />

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
    </ReduxProvider>
  );
}
