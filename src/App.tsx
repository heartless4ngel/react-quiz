import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorComponent from "./components/ErrorComponent";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30;

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type Status = "loading" | "error" | "ready" | "active" | "finished";

type State = {
  questions: QuestionType[];
  status: Status;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
};

export type Action =
  | { type: "dataReceived"; payload: QuestionType[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "finish" }
  | { type: "nextQuestion" }
  | { type: "reset" }
  | { type: "newAnswer"; payload: number }
  | { type: "tick" };

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.index].correctOption
            ? state.points + state.questions[state.index].points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status: state.secondsRemaining! <= 0 ? "finished" : state.status,
        highscore:
          state.secondsRemaining! <= 0
            ? Math.max(state.highscore, state.points)
            : state.highscore,
      };
    default:
      throw new Error("No type with this state");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = questions.reduce(
    (acc, currValue) => acc + currValue.points,
    0
  );

  useEffect(() => {
    if (status === "loading") {
      fetch("http://localhost:8000/questions")
        .then(res => res.json())
        .then(data =>
          dispatch({ type: "dataReceived", payload: data as QuestionType[] })
        )
        .catch(() => dispatch({ type: "dataFailed" }));
    }
  }, [status]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorComponent />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={questions.length} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              maxPoints={maxPoints}
              index={index}
              points={points}
              numberQuestions={questions.length}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                index={index}
                numQuestions={questions.length}
                dispatch={dispatch}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            highscore={highscore}
            maxPossiblePoints={maxPoints}
            points={points}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
