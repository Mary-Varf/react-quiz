import { useActionState } from "react";
import cls from "./AddQuestionPage.module.css";
import { delayFn } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/global.constants";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";
import type { IQuestionCardState } from "../../types/global.types";

const createCardAction = async (
  _prevState: Partial<IQuestionCardState>,
  formData: FormData,
) => {
  try {
    await delayFn();
    const data = Object.fromEntries(formData);
    const resources = (data?.resources as string).trim();
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
  } catch (error: any) {
    toast.error(error?.message);
    return {};
  }
};

export const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState<
    Partial<IQuestionCardState>,
    FormData
  >(createCardAction, {
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
          cardState={formState}
        />
      </div>
    </>
  );
};

export default AddQuestionPage;
