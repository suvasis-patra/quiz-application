import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./providers/QueryProvider.tsx";
import AuthContextProvider from "./providers/AuthContextProvider.tsx";
import FilterContextProvider from "./providers/FilterContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryProvider>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </QueryProvider>
    </AuthContextProvider>
  </StrictMode>
);
