import { useState, useEffect, useMemo } from "react";
import cls from "./HomePage.module.css";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const cards = await response.json();
    setQuestions(cards);
    console.log(cards);
    return cards;
  });

  useEffect(() => {
    getQuestions(`react?_sort=${sortSelectValue}`);
  }, [sortSelectValue]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
  };
  const cards = useMemo(
    () =>
      questions.filter((d) =>
        d.question.toLowerCase().includes(searchValue.trim().toLowerCase()),
      ),
    [questions, searchValue],
  );
  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
        <select
          name=""
          id=""
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          className={cls.select}
        >
          <option value="">sort by</option>
          <option value="level">level ASC</option>
          <option value="-level">level DESC</option>
          <option value="completed">completed ASC</option>
          <option value="-completed">completed DESC</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {cards.length === 0 && <p className={cls.noCards}>No cards...</p>}

      <QuestionCardList cards={cards} />
    </>
  );
};
