import {} from "react";
import cls from "./ThemeToggler.module.css";
import { useTheme } from "../../hooks/useTheme";
import { THEME_STORAGE } from "../../constants";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const onChangeHandler = () => {
    localStorage.setItem(THEME_STORAGE, theme === "light" ? "dark" : "light");
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={cls.toggleWrapper} onClick={onChangeHandler}>
      <input
        className={cls.input}
        id="dn"
        type="checkbox"
        checked={theme === "light"}
      />
      <label className={cls.toggle}>
        <span className={cls.toggle__handler}>
          <span className={`${cls.crater} ${cls.crater1}`}></span>
          <span className={`${cls.crater} ${cls.crater2}`}></span>
          <span className={`${cls.crater} ${cls.crater3}`}></span>
        </span>
        <span className={`${cls.star} ${cls.star1}`}></span>
        <span className={`${cls.star} ${cls.star2}`}></span>
        <span className={`${cls.star} ${cls.star3}`}></span>
        <span className={`${cls.star} ${cls.star4}`}></span>
        <span className={`${cls.star} ${cls.star5}`}></span>
        <span className={`${cls.star} ${cls.star6}`}></span>
      </label>
    </div>
  );
};
