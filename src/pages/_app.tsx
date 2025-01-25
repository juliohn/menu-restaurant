import "@/styles/globals.css";

import { Provider as ReduxProvider } from "react-redux";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { store } from "@/store";

import { Footer } from "@/components/Footer";
import { Loading } from "@/components/Loading";
import { Header } from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <ReduxProvider store={store}>
      <div className="min-h-screen flex flex-col md:bg-gray5">
        <div className="w-full">
          <Header />
        </div>

        <div className="px-4 md:bg-blue10 items-center justify-center w-full mx-auto max-w-screen-lg scrollbar-hidden flex-1">
          {loading ? <Loading /> : <Component {...pageProps} />}
        </div>

        <Footer />
      </div>
    </ReduxProvider>
  );
}
