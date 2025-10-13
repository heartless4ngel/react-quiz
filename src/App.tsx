import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

type Question = {
  question: string;
  options: [];
  correction: number;
  points: number;
};

type Status = "loading" | "error" | "ready" | "active" | "finished";

type State = {
  questions: Question[];
  status: Status;
};

type Action =
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

    default:
      throw new Error("No type with this state");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data =>
        dispatch({ type: "dataReceived", payload: data as Question[] })
      )
      .catch(err => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}

export default App;
