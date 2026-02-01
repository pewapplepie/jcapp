import React, { createContext, useState, useContext } from "react";

// Create the context
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ButtonColors = {
  bg_light: "bg-light",
  bg_dark: "bg-dark",
  txt_light: "text-white",
  txt_dark: "text-darkslategray",
};
