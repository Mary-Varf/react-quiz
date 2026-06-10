import {} from "react";
import cls from "./Button.module.css";

const isPrimary = true;

export const Button = ({ onClick, children }) => {
  return (
    <div
      className={`${cls.btn} ${isPrimary ? cls.primary : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
