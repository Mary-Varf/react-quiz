import { useState, useEffect, useMemo, useRef } from "react";
import cls from "./HomePage.module.css";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const controlsContainerRef = useRef();
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [searchParams, setSearchParams] = useState(
    `?_page=1&_per_page=${DEFAULT_PER_PAGE}`,
  );

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
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const pagination = useMemo(() => {
    const totlaCardsCount = questions?.pages || 0;

    return Array(totlaCardsCount)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
    setSearchParams(
      `?_page=1&_per_page=${DEFAULT_PER_PAGE}&_sort=${e.target.value}`,
    );
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(
        `?_page=${e.target.textContent}&_per_page=${DEFAULT_PER_PAGE}&_sort=${e.target.value}`,
      );
      controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getActivePageNumber = () => {
    return questions?.next === null ? questions?.last : questions.next - 1;
  };

  const cards = useMemo(() => {
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions?.data?.filter((d) =>
          d.question.toLowerCase().includes(searchValue.trim().toLowerCase()),
        );
      } else {
        return questions?.data;
      }
    } else
      return questions?.filter((d) =>
        d.question.toLowerCase().includes(searchValue.trim().toLowerCase()),
      );
  }, [questions, searchValue]);

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
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

      <QuestionCardList cards={cards} />

      {cards.length === 0 ? (
        <p className={cls.noCards}>No cards...</p>
      ) : (
        <div className={cls.paginationContainer} onClick={paginationHandler}>
          {pagination.map((el) => {
            return (
              <Button isActive={el === getActivePageNumber()} key={el}>
                {el}
              </Button>
            );
          })}
        </div>
      )}
    </>
  );
};
