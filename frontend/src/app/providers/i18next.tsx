import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import km from "@/shared/assets/languages/km.json";
import en from "@/shared/assets/languages/en.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      km: { translation: km.translation },
      en: { translation: en.translation },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "language",
    },
  });

export default i18next;