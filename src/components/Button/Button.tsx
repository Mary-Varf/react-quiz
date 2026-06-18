import { type FC, type MouseEvent, type ReactNode } from "react";
import cls from "./Button.module.css";

interface IButton {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
}

export const Button: FC<IButton> = ({
  onClick,
  isActive,
  isDisabled = false,
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
