import { useState, useEffect, useMemo, useRef } from "react";
import cls from "./HomePage.module.css";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";

const DEFAULT_PER_PAGE = 10;
const PAGINATION_BUTTONS = 5;
const ONE_PAGE = 1;
const TWO_PAGES = 2;

const PAGE_OPTIONS = [
  { value: 10, text: 10 },
  { value: 20, text: 20 },
  { value: 30, text: 30 },
  { value: 50, text: 50 },
  { value: 100, text: 100 },
];

const SORT_OPTIONS = [
  { value: "level", text: "level ASC" },
  { value: "-level", text: "level DESC" },
  { value: "completed", text: "completed ASC" },
  { value: "-completed", text: "completed DESC" },
];

export const HomePage = () => {
  const controlsContainerRef = useRef();
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [countSelectValue, setCountSelectValue] = useState("");
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
    return cards;
  });

  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  // TODO: remove on production
  useEffect(() => {
    alert(
      "Thanks for visiting!\nThis project is hosted on a free server, which may take up to 10 seconds to wake up after being idle. Your request is being processed, please stay on this page, and everything will load automatically.",
    );
  }, []);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;

    return Array(totalCardsCount)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
    setSearchParams(
      `?_page=1&_per_page=${countSelectValue}&_sort=${e.target.value}`,
    );
  };

  const onCountSelectChangeHandler = (e) => {
    setCountSelectValue(e.target.value);
    setSearchParams(
      `?_page=1&_per_page=${e.target.value}&_sort=${sortSelectValue}`,
    );
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setSearchParams(
        `?_page=${e.target.textContent}&_per_page=${countSelectValue}&_sort=${e.target.value}`,
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
        <Select
          defaultValue="sort by"
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          options={SORT_OPTIONS}
        />
        <Select
          defaultValue="count"
          value={countSelectValue}
          onChange={onCountSelectChangeHandler}
          options={PAGE_OPTIONS}
        />
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList cards={cards} />

      {cards.length === 0 ? (
        <p className={cls.noCards}>No cards...</p>
      ) : pagination.length > 1 ? (
        <div className={cls.paginationContainer} onClick={paginationHandler}>
          {pagination.map((el) => {
            if (
              pagination.length > PAGINATION_BUTTONS &&
              (el == ONE_PAGE ||
                el == getActivePageNumber() ||
                el == pagination.length ||
                el == getActivePageNumber() + ONE_PAGE ||
                el == getActivePageNumber() - ONE_PAGE)
            ) {
              return (
                <Button isActive={el === getActivePageNumber()} key={el}>
                  {el}
                </Button>
              );
            } else if (
              pagination.length > PAGINATION_BUTTONS &&
              (el == getActivePageNumber() + TWO_PAGES ||
                el == getActivePageNumber() - TWO_PAGES)
            ) {
              return "...";
            } else {
              return "";
            }
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
