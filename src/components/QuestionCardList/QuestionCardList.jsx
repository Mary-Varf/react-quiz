import {} from "react";
import cls from "./QuestionCardList.module.css";
import { QuestionCard } from "../QuestionCard/QuestionCard";

export const QuestionCardList = ({ cards }) => {
  return (
    <div className={cls.cardName}>
      {cards & (cards.length > 0)
        ? cards.map((card, index) => {
            return <QuestionCard key={index} card={card} />;
          })
        : ""}
    </div>
  );
};
