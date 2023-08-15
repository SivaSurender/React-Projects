import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./components/Main";

const initialState = {
  questions: [],
  status: "loading",
};
function App() {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  function reducerFn(state, action) {
    switch (action.type) {
      case "dataFetched": {
        return { ...state, questions: action.payload, status: "ready" };
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
        const data = await res.json();
        console.log(data, "1");
        dispatch({ type: "dataFetched", payload: data });
      } catch (error) {
        console.log(error);
      }
    };

    getQuest();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>

        <p>Question?</p>
      </Main>
    </div>
  );
}

export default App;
