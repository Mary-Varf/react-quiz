import { useLayoutEffect } from "react";
import cls from "./ThemeToggler.module.css";
import { useTheme } from "../../hooks/useTheme";
import { THEME, THEME_STORAGE } from "../../constants";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    const isChecked = theme !== THEME.DARK;
    localStorage.setItem(THEME_STORAGE, isChecked ? THEME.LIGHT : THEME.DARK);
  }, []);

  const onChangeHandler = (e) => {
    const updatedTheme = e.target.checked === false ? THEME.LIGHT : THEME.DARK;
    localStorage.setItem(THEME_STORAGE, updatedTheme);

    updatedTheme === THEME.LIGHT
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
        checked={theme == THEME.DARK}
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
