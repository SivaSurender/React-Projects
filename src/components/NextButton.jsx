import React from "react";

function NextButton({ dispatch, answer, index, questions }) {
  const checkLast = questions.length === index + 1;

  if (checkLast) {
    dispatch({ type: "finish" });
  }
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      {checkLast ? "Finish" : "Proceed To Next Question"}
    </button>
  );
}

export default NextButton;
