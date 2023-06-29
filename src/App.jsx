import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
function App() {
  // const stepCounter = 3;
  const [stepCounter, setStepCounter] = useState(1);

  return (
    <div classNameName="steps">
      <div className="numbers">
        <div className={stepCounter >= 1 ? "active" : ""}>1</div>
        <div className={stepCounter >= 2 ? "active" : ""}>2</div>
        <div className={stepCounter >= 3 ? "active" : ""}>3</div>
      </div>

      <p className="message">
        Step {stepCounter} : {messages[stepCounter - 1]}
      </p>

      <div className="buttons">
        <button
          onClick={() => stepCounter > 1 && setStepCounter((prev) => prev - 1)}
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
        >
          Previous
        </button>

        <button
          onClick={() => stepCounter < 3 && setStepCounter((prev) => prev + 1)}
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
