import React from "react";

function Options({ options, dispatch, answer, questions }) {
  console.log(answer === questions.correctOption, "ans");
  return (
    <div className="options">
      {options?.map((each, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answer
                ? questions.correctOption === index
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={each}
            onClick={() => dispatch({ type: "recordedAnswer", payload: index })}
            disabled={answer}
          >
            {each}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
