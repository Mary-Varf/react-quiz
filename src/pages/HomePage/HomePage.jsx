import { useState, useEffect } from "react";
import cls from "./HomePage.module.css";
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constants";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();
      setQuestions(questions);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {questions.map((card, index) => {
        return <QuestionCard key={index} card={card} />;
      })}

      <button onClick={getQuestions}>Get Questions</button>
    </>
  );
};
