import { useActionState } from "react";
import cls from "./EditQuestionPage.module.css";
import { QuestionForm } from "../../components/QuestionForm";
import { Loader } from "../../components/Loader";
import { delayFn } from "../../helpers/delayFn";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { dateFormat } from "../../helpers/dataFormat";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import EditQuestionPage from "./EditQuestionPage";

export const EditQuestion = ({ initialState = {} }) => {
  const navigate = useNavigate();
  const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${initialState.id}`, {
      method: "DELETE",
    });
    const data = await response.json();

    toast.success("Question has been deleted");
    navigate("/");
  });

  const editCardAction = async (_prevState, formData) => {
    try {
      await delayFn();

      const data = Object.fromEntries(formData);
      const resources = data.resources.trim();
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
      toast.success("New question is eddited created");
      return isClearForm ? {} : question;
    } catch (error) {
      toast.error(error);
      return {};
    }
  };

  const [formState, formAction, isPending] = useActionState(editCardAction, {
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
          formState={formState}
        />
      </div>
    </>
  );
};
