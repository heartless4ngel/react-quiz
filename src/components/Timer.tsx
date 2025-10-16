import { useEffect } from "react";
import type { Action } from "../App";

type TimerProps = {
  dispatch: React.ActionDispatch<[action: Action]>;
  secondsRemaining: number | null;
};

function Timer({ dispatch, secondsRemaining }: TimerProps) {
  const mins = Math.floor(secondsRemaining! / 60);
  const secs = secondsRemaining! % 60;
  useEffect(() => {
    const interval = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;
