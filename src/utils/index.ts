function getLocale() {
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;
  return userLocale;
}

type Locale = "pt-BR" | "en-US" | "fr-FR" | "en-AU";

const getCurrencyCode = (locale: Locale): string => {
  const localeCurrencyMap: { [key in Locale]: string } = {
    "pt-BR": "BRL", // Real brasileiro
    "en-US": "USD", // Dólar americano
    "fr-FR": "EUR", // Euro
    "en-AU": "AUD", // Dólar australiano
  };

  return localeCurrencyMap[locale] || "AUD"; // Default para 'AUD' se a localidade não estiver mapeada
};

export function formatCurrencyDecimals(number: number) {
  const locale = getLocale();

  const currencyCode = getCurrencyCode(locale);

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(number);
}
