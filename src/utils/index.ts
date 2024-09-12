type CurrencyCode = "BRL" | "USD" | "EUR" | "AUD" | "GBP" | "JPY"; // Adicione outros códigos conforme necessário

const getCurrencyCode = (locale: string): CurrencyCode => {
  const localeCurrencyMap: { [key: string]: CurrencyCode } = {
    "pt-BR": "BRL", // Real brasileiro
    "en-US": "USD", // Dólar americano
    "fr-FR": "EUR", // Euro
    "en-AU": "AUD", // Dólar australiano
    "en-GB": "GBP", // Libra esterlina
    "ja-JP": "JPY", // Iene japonês
    // Adicione outros mapeamentos conforme necessário
  };

  return localeCurrencyMap[locale] || "USD"; // Default para 'USD' se a localidade não estiver mapeada
};

export const formatCurrencyDecimals = (number: number): string => {
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
  const currencyCode = getCurrencyCode(userLocale);

  const formatter = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(number);
};
