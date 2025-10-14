import type { Action, QuestionType } from "../App";

type OptionsProps = {
  question: QuestionType;
  dispatch: React.ActionDispatch<[action: Action]>;
  answer: number | null;
};

function Options({ question, dispatch, answer }: OptionsProps) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
