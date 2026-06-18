import { type FC, type ReactNode } from "react";
import cls from "./Badge.module.css";
import { BADGE_ENUM } from "../../types/global.types";

export interface IBadgeProps {
  children: ReactNode;
  variant: BADGE_ENUM;
}

export const Badge: FC<IBadgeProps> = ({ children, variant }) => {
  switch (variant) {
    case BADGE_ENUM.PRIMARY:
      return <div className={`${cls.badge} ${cls.primary}`}> {children} </div>;
    case BADGE_ENUM.SUCCESS:
      return <div className={`${cls.badge} ${cls.success}`}> {children} </div>;
    case BADGE_ENUM.WARNING:
      return <div className={`${cls.badge} ${cls.warning}`}> {children} </div>;
    case BADGE_ENUM.ALERT:
      return <div className={`${cls.badge} ${cls.alert}`}> {children} </div>;
    default:
      return <div className={cls.badge}> {children} </div>;
  }
};
