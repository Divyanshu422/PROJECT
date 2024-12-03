import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeContextProvider from "./contextAPI/ThemeContext";
import { AuthProvider } from "./contextAPI/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </AuthProvider>
);
