import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// i18next
import i18n from "i18next";
import "./providers/i18next";
// Components
import Router from "./router/router";
import { Toaster } from "./providers/toaster";

function App() {
  useEffect(() => {
    // 1. Get the language from localStorage, or default to 'en' if it doesn't exist
    const savedLng = localStorage.getItem("language");
    const lng = savedLng || "en";

    // 2. If it wasn't in localStorage, save the fallback 'en' so it's there next time
    if (!savedLng) {
      localStorage.setItem("language", "en");
    }

    // 3. Apply the language change
    i18n.changeLanguage(lng);
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Toaster />
      <Router />
    </BrowserRouter>
  );
}

export default App;
