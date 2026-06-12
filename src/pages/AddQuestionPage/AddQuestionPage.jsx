import { useActionState } from "react";
import cls from "./AddQuestionPage.module.css";
import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { delayFn } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";

const LEVEL_OPTIONS = [
  { value: 1, text: "1 - easiest" },
  { value: 2, text: "2 - medium" },
  { value: 3, text: "3 - hardest" },
];

const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn();
    const data = Object.fromEntries(formData);
    const resources = data.resources.trim();
    const isClearForm = data.clearForm;

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: data.question,
        answer: data.answer,
        description: data.description,
        resources: resources.length ? resources.split(",") : [],
        level: +data.level,
        completed: false,
        editDate: undefined,
      }),
    });
    if (response.status === 404) {
      toast.error(response.statusText);
      throw new Error(response.statusText);
    }
    const question = response.json();
    toast.success("New question is successfully created");
    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error);
    return {};
  }
};

export const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, {
    clearForm: true,
  });
  return (
    <>
      <h1 className={cls.formTitle}>Add new question</h1>
      <form action={formAction} className={cls.formContiner}>
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
            required
            placeholder="Please enter resources separated by commas"
            defaultValue={formState?.resources}
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

        <Button isDisabled={isPending}>Add question</Button>
      </form>
    </>
  );
};
