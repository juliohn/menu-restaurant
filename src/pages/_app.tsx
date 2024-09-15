import "@/styles/globals.css";

import { Provider as ReduxProvider } from "react-redux";
import type { AppProps } from "next/app";

import { store } from "@/store";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
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
