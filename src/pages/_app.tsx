import "@/styles/globals.css";

import { Provider as ReduxProvider } from "react-redux";
import type { AppProps } from "next/app";

import { store } from "@/store";

import { Header } from "@/components/header";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export default function App({ Component, pageProps }: AppProps) {
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
    </ReduxProvider>
  );
}
