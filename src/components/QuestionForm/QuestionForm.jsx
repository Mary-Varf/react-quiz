import {} from "react";
import cls from "./QuestionForm.module.css";
import { Button } from "../Button";

const LEVEL_OPTIONS = [
  { value: 1, text: "1 - easiest" },
  { value: 2, text: "2 - medium" },
  { value: 3, text: "3 - hardest" },
];

export const QuestionForm = ({
  formAction,
  formState,
  isPending,
  submitBtnText,
}) => {
  const defaultResources =
    formState.resources && Array.isArray(formState.resources)
      ? formState.resources.join(", ")
      : "";
  return (
    <form action={formAction} className={cls.form}>
      <input type="text" hidden defaultValue={formState.id} name="questionId" />
      <div className={cls.formControl}>
        <label htmlFor="questionField">Question:</label>
        <textarea
          name="question"
          id="questionField"
          cols="30"
          rows="2"
          required
          placeholder="Please enter question"
          defaultValue={formState?.question}
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="shortAnswerField">Short Answer:</label>
        <textarea
          name="answer"
          id="shortAnswerField"
          cols="30"
          rows="2"
          required
          placeholder="Please enter short anser"
          defaultValue={formState?.answer}
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="descriptionField">Description:</label>
        <textarea
          name="description"
          id="descriptionField"
          cols="30"
          rows="5"
          required
          placeholder="Please enter description"
          defaultValue={formState?.description}
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="resourcesField">Resources:</label>
        <textarea
          name="resources"
          id="resourcesField"
          cols="30"
          rows="3"
          placeholder="Please enter resources separated by commas"
          defaultValue={defaultResources}
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="levelField">Level:</label>
        <select name="level" id="levelField">
          <option disabled>Question level</option>
          {LEVEL_OPTIONS.map((el) => (
            <option key={el.value} value={el.value}>
              {el.text}
            </option>
          ))}
        </select>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="clearFormField" className={cls.clearFormControl}>
          <input
            type="checkbox"
            name="clearForm"
            id="clearFormField"
            defaultChecked={formState?.clearForm && true}
            className={cls?.checkbox}
          />
          <span>Clear form after submitting?</span>
        </label>
      </div>

      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};
