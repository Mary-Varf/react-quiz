import { useLayoutEffect, type ChangeEvent } from "react";
import cls from "./ThemeToggler.module.css";
import { useTheme } from "../../hooks/useTheme";
import { THEME_STORAGE } from "../../constants";
import { THEME_ENUM } from "../../types/global.types";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    const isChecked = theme !== THEME_ENUM.DARK;
    localStorage.setItem(
      THEME_STORAGE,
      isChecked ? THEME_ENUM.LIGHT : THEME_ENUM.DARK,
    );
  }, []);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const updatedTheme =
      e.target.checked === false ? THEME_ENUM.LIGHT : THEME_ENUM.DARK;
    localStorage.setItem(THEME_STORAGE, updatedTheme);

    updatedTheme === THEME_ENUM.LIGHT
      ? document.body.classList.remove("darkLayout")
      : document.body.classList.add("darkLayout");
    setTheme(updatedTheme);
  };

  return (
    <div className={cls.toggleWrapper}>
      <input
        className={cls.input}
        id="dn"
        type="checkbox"
        onChange={onChangeHandler}
        checked={theme == THEME_ENUM.DARK}
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
