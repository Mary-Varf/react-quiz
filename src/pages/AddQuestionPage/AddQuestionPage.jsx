import { useActionState } from "react";
import cls from "./AddQuestionPage.module.css";
import { Button } from "../../components/Button";
import { delayFn } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/global.constants";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";

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
      {isPending && <Loader />}

      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
        <QuestionForm
          formAction={formAction}
          isPending={isPending}
          submitBtnText={"Add question"}
          formState={formState}
        />
      </div>
    </>
  );
};

export default AddQuestionPage;
