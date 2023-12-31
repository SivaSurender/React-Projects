import Options from "./Options";

function Questions({ questions, dispatch, answer }) {
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options
        options={questions.options}
        dispatch={dispatch}
        answer={answer}
        questions={questions}
      />
    </div>
  );
}

export default Questions;
