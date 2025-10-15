type ProgressBarProps = {
  numberQuestions: number;
  maxPoints: number;
  index: number;
  points: number;
  answer: number | null;
};

function ProgressBar({
  maxPoints,
  index,
  points,
  numberQuestions,
  answer,
}: ProgressBarProps) {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numberQuestions} />
      <p>
        Question <strong>{index + 1}</strong>/{numberQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
}

export default ProgressBar;
