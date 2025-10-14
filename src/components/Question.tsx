import type { Action, QuestionType } from "../App";
import Options from "./Options";

type QuestionProps = {
  question: QuestionType;
  dispatch: React.ActionDispatch<[action: Action]>;
  answer: number | null;
};

function Question({ question, dispatch, answer }: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
