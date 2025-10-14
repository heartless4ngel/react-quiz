import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorComponent from "./components/ErrorComponent";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

type Question = {
  question: string;
  options: string[];
  correction: number;
  points: number;
};

type Status = "loading" | "error" | "ready" | "active" | "finished";

type State = {
  questions: Question[];
  status: Status;
};

export type Action =
  | { type: "dataReceived"; payload: Question[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "finish" };

const initialState: State = {
  questions: [],
  status: "loading",
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
      };

    default:
      throw new Error("No type with this state");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data =>
        dispatch({ type: "dataReceived", payload: data as Question[] })
      )
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorComponent />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={questions.length} />
        )}
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}

export default App;
