import {} from "react";
import cls from "./QuestionCard.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export const QuestionCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <div>Level: {card.level}</div>
        <div>{card.complited ? "Complited" : "Not Complited"}</div>
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
