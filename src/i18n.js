import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { store } from "./store";

import translationEN from "./locales/en/translation.json";
import translationPT from "./locales/pt/translation.json";

const lng = store.getState().whitelabel.locale.split("-")[0];

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: lng, // idioma padrão
  fallbackLng: "en", // idioma de fallback
  interpolation: {
    escapeValue: false,
  },
});

store.subscribe(() => {
  const currentLanguage = store.getState().whitelabel.locale;
  if (currentLanguage !== i18n.language) {
    i18n.changeLanguage(currentLanguage);
  }
});

export default i18n;
