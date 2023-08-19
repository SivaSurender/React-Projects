import React, { useEffect } from "react";
// function secondsToMMSS(seconds) {
//   const date = new Date(0);
//   date.setSeconds(seconds);

//   return date.toISOString().substr(14, 5);
// }

function Timer({ remainingTime, dispatch }) {
  const mins = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
