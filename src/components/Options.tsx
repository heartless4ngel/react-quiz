import type { QuestionType } from "../App";

type OptionsProps = {
  question: QuestionType;
};

function Options({ question }: OptionsProps) {
  return (
    <div className="options">
      {question.options.map(option => (
        <button className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
