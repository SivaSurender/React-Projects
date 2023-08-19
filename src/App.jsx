import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./components/Main";
import Loader from "./Loader";
import StartScreen from "./components/StartScreen";
import Error from "./Error";
import Questions from "./components/Questions";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
};
function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducerFn,
    initialState
  );
  const numQuestions = questions?.length;

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
        return { ...state, answer: action.payload };
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

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Questions
            questions={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
