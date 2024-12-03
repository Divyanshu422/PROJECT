import { createContext } from "react";
import { useState } from "react";

//* Step1 : Creating the context
export const SideBarToggleContext = createContext();

//* Creating the Provider
export const SideBarToggleProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <SideBarToggleContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SideBarToggleContext.Provider>
  );
};
