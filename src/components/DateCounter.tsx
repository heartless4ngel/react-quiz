import { useReducer } from "react";

type State = {
  count: number;
  step: number;
};

type Action =
  | { type: "inc"; payload?: number }
  | { type: "dec"; payload?: number }
  | { type: "reset" }
  | { type: "setCount"; payload: number }
  | { type: "setStep"; payload: number };

function countReducer(state: State, action: Action): State {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "reset":
      return { count: 0, step: 1 };
    case "setStep":
      return { ...state, step: action.payload };
    case "setCount":
      return { ...state, count: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const initialState: State = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(countReducer, initialState);

  const date = new Date();
  date.setDate(date.getDate() + state.count);

  const dec = () => dispatch({ type: "dec" });
  const inc = () => dispatch({ type: "inc" });

  const defineCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value)) dispatch({ type: "setCount", payload: value });
  };

  const defineStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value)) dispatch({ type: "setStep", payload: value });
  };

  const reset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input type="text" value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
