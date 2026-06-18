import { type FC } from "react";
import cls from "./QuestionCard.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { Badge } from "../Badge";
import { BADGE_ENUM, type IQuestionCard } from "../../types/global.types";

export interface IQuestionCardProps {
  card: IQuestionCard;
}

export const QuestionCard: FC<IQuestionCardProps> = ({ card }) => {
  const navigate = useNavigate();

  const levelVariant =
    card.level === 1
      ? BADGE_ENUM.PRIMARY
      : card.level === 2
        ? BADGE_ENUM.WARNING
        : BADGE_ENUM.ALERT;
  const completedVariant = card.completed
    ? BADGE_ENUM.SUCCESS
    : BADGE_ENUM.PRIMARY;

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <Badge variant={levelVariant}>Level: {card.level}</Badge>
        <Badge variant={completedVariant}>
          {card.completed ? "Completed" : "Not Completed"}
        </Badge>
      </div>
      <h5 className={cls.cardTitle}>{card.question}</h5>
      <div className={cls.cardAnswers}>
        <label>short answer:</label>
        <p className={cls.cardAnswer}>{card.answer}</p>
      </div>
      <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>
    </div>
  );
};
