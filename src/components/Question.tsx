import type { QuestionType } from "../App";
import Options from "./Options";

type QuestionProps = {
  question: QuestionType;
};

function Question({ question }: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
