import React from "react";

function Options({ options, dispatch, answer, questions }) {
  return (
    <div className="options">
      {options?.map((each, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answer !== null
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={each}
            onClick={() => dispatch({ type: "recordedAnswer", payload: index })}
            disabled={answer !== null}
          >
            {each}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
