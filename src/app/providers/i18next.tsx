import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import km from "@/shared/assets/languages/km.json";
import en from "@/shared/assets/languages/en.json";

// Get the saved language from localStorage, fallback to 'en'
const savedLanguage = localStorage.getItem("language") || "en";

i18next.use(initReactI18next).init({
  resources: {
    kh: { translation: km.translation },
    en: { translation: en.translation },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
