import { type ChangeEvent, type FC } from "react";
import cls from "./Select.module.css";

interface ISelectOption {
  value: string | number;
  text: string;
}
export interface ISelectProps {
  value: string;
  onChange: (e: ChangeEvent) => void;
  options: ISelectOption[];
  defaultValue: string;
}

export const Select: FC<ISelectProps> = ({
  value,
  onChange,
  options,
  defaultValue,
}) => {
  return (
    <select
      name=""
      id=""
      value={value}
      onChange={onChange}
      className={cls.select}
    >
      <option value="" disabled>
        {defaultValue}
      </option>
      {options?.map((option: ISelectOption) => {
        return (
          <option value={option?.value} key={option?.text}>
            {option?.text}
          </option>
        );
      })}
    </select>
  );
};
