import { createContext } from "react";
import { useState } from "react";
//  Creating the context in the for theme change
export const ThemeContext = createContext();

//* Creating the Provider for the themeContext
const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
