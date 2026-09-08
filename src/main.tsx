import "./app/styles/index.css";
import App from "@/app/App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./app/providers/provider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { query_client } from "./shared/libs/ReactQuery.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={query_client}>
      <Provider>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
