import {
  createContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { THEME_STORAGE } from "../constants/global.constants";
import { THEME_ENUM, type IThemeContext } from "../types/global.types";

export const ThemeContext = createContext<IThemeContext>({
  setTheme: () => {},
  theme: THEME_ENUM.LIGHT,
});

interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
  const savedTheme: THEME_ENUM =
    (localStorage.getItem(THEME_STORAGE) as THEME_ENUM) || THEME_ENUM.LIGHT;
  const [theme, setTheme] = useState<THEME_ENUM>(savedTheme);

  useEffect(() => {
    const detectTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isDark) {
        setTheme(THEME_ENUM.DARK);
        document.body.classList.remove("darkLayout");
        localStorage.setItem(THEME_STORAGE, THEME_ENUM.LIGHT);
      } else {
        savedTheme === THEME_ENUM.DARK &&
          document.body.classList.add("darkLayout");
        localStorage.setItem(THEME_STORAGE, THEME_ENUM.DARK);
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
