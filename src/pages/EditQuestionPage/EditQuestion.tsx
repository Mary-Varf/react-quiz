import { useActionState, type FC } from "react";
import cls from "./EditQuestionPage.module.css";
import { QuestionForm } from "../../components/QuestionForm";
import { Loader } from "../../components/Loader";
import { delayFn } from "../../helpers/delayFn";
import { API_URL } from "../../constants/global.constants";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/dataFormat";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import type {
  IQuestionCard,
  IQuestionCardState,
} from "../../types/global.types";

interface IEditQuestionProps {
  initialState: IQuestionCard;
}

export const EditQuestion: FC<IEditQuestionProps> = ({ initialState }) => {
  const navigate = useNavigate();
  const questionId = initialState?.id || "";
  const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);

    toast.success("Question has been deleted");
    navigate("/");
  });

  const editCardAction = async (
    _prevState: Partial<IQuestionCardState>,
    formData: FormData,
  ) => {
    try {
      await delayFn();

      const data = Object.fromEntries(formData);
      const resources = (data.resources as string).trim();
      const questionId = data.questionId;
      const isClearForm = data.clearForm;

      console.log(dateFormat(new Date()));
      const response = await fetch(`${API_URL}/react/${questionId}`, {
        method: "PATCH",
        body: JSON.stringify({
          question: data.question,
          answer: data.answer,
          description: data.description,
          resources: resources.length ? resources.split(",") : [],
          level: +data.level,
          completed: false,
          editDate: dateFormat(new Date()),
        }),
      });
      if (!response.ok) {
        toast.error(response.statusText);
        throw new Error(response.statusText);
      }
      const question = response.json();
      toast.success("New question is edited");
      return isClearForm ? {} : question;
    } catch (error: any) {
      toast.error(error?.message);
      return {};
    }
  };

  const [formState, formAction, isPending] = useActionState<
    Partial<IQuestionCardState>,
    FormData
  >(editCardAction, {
    ...initialState,
    clearForm: false,
  });

  const onRemoveQuestionHandler = () => {
    const isRemove = confirm("Are you sure?");

    isRemove && removeQuestion();
  };

  return (
    <>
      {isPending || (isQuestionRemoving && <Loader />)}

      <h1 className={cls.formTitle}>Edit question</h1>
      <div className={cls.formContainer}>
        <button
          className={cls.removeBtn}
          onClick={onRemoveQuestionHandler}
          disabled={isPending || isQuestionRemoving}
        >
          Delete
        </button>
        <QuestionForm
          formAction={formAction}
          isPending={isPending || isQuestionRemoving}
          submitBtnText={"Edit question"}
          cardState={formState}
        />
      </div>
    </>
  );
};
