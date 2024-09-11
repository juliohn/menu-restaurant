import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Header } from "@/components/header";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const openBasketModal = () => {
    router.push(`/basket`);
  };

  return (
    <div>
      <Nav />
      <div className="mt-16 w-full">
        <Header />
      </div>
      <div className="px-4 md:bg-blue10 items-center justify-center w-full mx-auto max-w-screen-lg .scrollbar-hidden flex-grow">
        <Component {...pageProps} />
      </div>

      <Footer />

      <div className="md:hidden  mt-4 w-full px-4 mb-4">
        <button
          onClick={openBasketModal}
          className="w-full bg-brown500 px-8 py-2  text-white font-bold rounded-3xl"
        >
          Your basket . 1 item
        </button>
      </div>
    </div>
  );
}
