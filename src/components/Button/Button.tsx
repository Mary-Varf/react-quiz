import { type FC, type ReactNode } from "react";
import cls from "./Button.module.css";

interface IButton {
  onClick: () => {};
  isActive: boolean;
  isDisabled: boolean;
  children: ReactNode;
}

export const Button: FC<IButton> = ({
  onClick,
  isActive,
  isDisabled,
  children,
}) => {
  return (
    <button
      className={`${cls.btn} ${isActive ? cls.active : ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
