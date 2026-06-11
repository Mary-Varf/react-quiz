import { useId } from "react";
import cls from "./SearchInput.module.css";
import { SearchIcon } from "../icons";

export const SearchInput = ({ value, onChange }) => {
  const inputId = useId();
  return (
    <div className={cls.inputContainer}>
      <label htmlFor={inputId}>
        <SearchIcon className={cls.icon} />
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        id={inputId}
        placeholder="search"
        className={cls.input}
      />
    </div>
  );
};
