import { BrowserRouter } from "react-router-dom";
import "./providers/i18next";
import Router from "./router/router";
import { Toaster } from "./providers/toaster";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Toaster />
      <Router />
    </BrowserRouter>
  );
}

export default App;
