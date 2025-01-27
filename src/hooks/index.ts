import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type CurrencyCode = "BRL" | "USD" | "EUR" | "AUD" | "GBP" | "JPY";

export const useFormatCurrency = () => {
  const language = useAppSelector((state) => state.whitelabel.locale);

  const getCurrencyCode = (locale: string): CurrencyCode => {
    const localeCurrencyMap: { [key: string]: CurrencyCode } = {
      "pt-BR": "BRL",
      "en-US": "USD",
      "fr-FR": "EUR",
      "en-AU": "AUD",
      "en-GB": "GBP",
      "ja-JP": "JPY",
    };

    return localeCurrencyMap[locale] || "USD";
  };

  const formatCurrencyDecimals = (number: number): string => {
    const currencyCode = getCurrencyCode(language);

    const formatter = new Intl.NumberFormat(language, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(number);
  };

  return { formatCurrencyDecimals };
};
