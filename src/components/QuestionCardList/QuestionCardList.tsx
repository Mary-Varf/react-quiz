import { memo, type FC } from "react";
import cls from "./QuestionCardList.module.css";
import { QuestionCard } from "../QuestionCard/QuestionCard";
import type { IQuestionCard } from "../../types/global.types";

export interface IQuestionCardListProps {
  cards: IQuestionCard[];
}

export const QuestionCardList: FC<IQuestionCardListProps> = memo(
  ({ cards }) => {
    return (
      <div className={cls.cardName}>
        {cards.map((card, index) => {
          return <QuestionCard key={index} card={card} />;
        })}
      </div>
    );
  },
);
