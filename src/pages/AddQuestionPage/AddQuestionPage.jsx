import {} from "react";
import cls from "./AddQuestionPage.module.css";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";

const LEVEL_OPTIONS = [
  { value: 1, text: "1 - easiest" },
  { value: 2, text: "2 - medium" },
  { value: 3, text: "3 - hardest" },
];

export const AddQuestionPage = () => {
  return (
    <>
      <h1 className={cls.formTitle}>Add new question</h1>
      <form action="" className={cls.formContiner}>
        <div className={cls.formControl}>
          <label htmlFor="questionField">Question:</label>
          <textarea
            name="question"
            id="questionField"
            cols="30"
            rows="2"
            required
            placeholder="Please enter question"
            defaultValue={"default"}
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
            defaultValue={"default"}
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
            defaultValue={"default"}
          ></textarea>
        </div>

        <div className={cls.formControl}>
          <label htmlFor="resourcesField">Resources:</label>
          <textarea
            name="resources"
            id="resourcesField"
            cols="30"
            rows="3"
            required
            placeholder="Please enter resources separated by commas"
            defaultValue={"default"}
          ></textarea>
        </div>

        <div className={cls.formControl}>
          <label htmlFor="levelField">Level:</label>
          <Select
            onChange={() => {}}
            options={LEVEL_OPTIONS}
            value={1}
            defaultValue={"Question level"}
          />
        </div>

        <div className={cls.formControl}>
          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultValue={true}
              className={cls.checkbox}
            />
            <span>Clear form after submitting?</span>
          </label>
        </div>

        <Button>Add question</Button>
      </form>
    </>
  );
};
