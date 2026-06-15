import { createContext, useEffect, useState } from "react";
import { THEME, THEME_STORAGE } from "../constants";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem(THEME_STORAGE) || THEME.LIGHT;
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    const detectTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isDark) {
        setTheme(THEME.DARK);
        document.body.classList.remove("darkLayout");
        localStorage.setItem(THEME_STORAGE, THEME.LIGHT);
      } else {
        savedTheme === THEME.DARK && document.body.classList.add("darkLayout");
        localStorage.setItem(THEME_STORAGE, THEME.DARK);
        setTheme(savedTheme);
      }
    };
    detectTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQuery.addEventListener("change", detectTheme);

    return () => {
      mediaQuery.removeEventListener("change", detectTheme);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
