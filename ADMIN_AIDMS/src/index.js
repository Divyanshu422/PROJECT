import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeContextProvider from "./contextAPI/ThemeContext";
import { AuthProvider } from "./contextAPI/AuthContext";
import { SideBarToggleProvider } from "./contextAPI/SideBarToggleContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ThemeContextProvider>
      <SideBarToggleProvider>
        <App />
      </SideBarToggleProvider>
    </ThemeContextProvider>
  </AuthProvider>
);
