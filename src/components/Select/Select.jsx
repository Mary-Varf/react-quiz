import {} from "react";
import cls from "./Select.module.css";

export const Select = ({ value, onChange, options, defaultValue }) => {
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
      {options?.map((option) => {
        return (
          <option value={option?.value} key={option?.text}>
            {option?.text}
          </option>
        );
      })}
    </select>
  );
};
