import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./components/Main";
import Loader from "./Loader";
import StartScreen from "./components/StartScreen";
import Error from "./Error";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};
function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducerFn, initialState);
  const numQuestions = questions?.length;
  const maxPossiblePoints = questions?.reduce(
    (acc, curr) => (acc += curr.points),
    0
  );

  function reducerFn(state, action) {
    switch (action.type) {
      case "dataFetched": {
        return { ...state, questions: action.payload, status: "ready" };
      }
      case "dataFetchfailed": {
        return { ...state, status: "error", errorMsg: action.payload };
      }
      case "dataActive": {
        return { ...state, status: "active" };
      }
      case "recordedAnswer": {
        return {
          ...state,
          answer: action.payload,
          points:
            state.questions[state.index].correctOption === action.payload
              ? state.points + state.questions[state.index].points
              : state.points,
        };
      }
      case "nextQuestion": {
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      }
      case "finish": {
        return {
          ...state,
          status: "finish",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      }
      case "restart": {
        return {
          ...initialState,
          questions: state.questions,
          status: "ready",
        };
      }
      default: {
        return initialState;
      }
    }
  }

  useEffect(() => {
    const getQuest = async function () {
      try {
        const res = await fetch("http://localhost:3000/questions");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data, "1");
        dispatch({ type: "dataFetched", payload: data });
      } catch (error) {
        console.log(error);
        dispatch({ type: "dataFetchfailed", payload: error.message });
      }
    };

    getQuest();
  }, []);

  console.log(answer, "xz ");
  return (
    <div className="app">
      <Header />
      <Main>
        {{
          loading: () => <Loader />,
          error: () => <Error />,
          ready: () => (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          ),
          active: () => (
            <>
              <ProgressBar
                numQuestions={numQuestions}
                maxPossiblePoints={maxPossiblePoints}
                index={index}
                answer={answer}
                points={points}
              />
              <Questions
                questions={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                questions={questions}
              />
            </>
          ),
          finish: () => (
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          ),
        }[status]()}
      </Main>
    </div>
  );
}

export default App;
