import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 10, packed: true },
];

function App() {
  const [data, setData] = useState(initialItems);

  const getData = (init) => {
    setData((prev) => [...prev, init]);
  };

  const deleteHandler = (id) => {
    setData((prev) =>
      prev.filter((each, index) => {
        return each.id !== id;
      })
    );
  };

  const checkHandler = (id) => {
    console.log(id);
    setData((prev) => {
      console.log(prev);
      return prev.map((each, index) => {
        if (each.id === id) {
          return { ...each, packed: !each.packed };
        }
        return each;
      });
    });
  };
  return (
    <div className="app">
      <Logo />
      <Form getData={getData} />
      <PackingList
        data={data}
        deleteHandler={deleteHandler}
        checkHandler={checkHandler}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away C-List</h1>;
}

function Form({ getData }) {
  const [userDetails, setUserDetails] = useState({
    selectVal: 1,
    description: "",
  });
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!userDetails.description) return;
    const newlyAdded = {
      id: Date.now(),
      description: userDetails.description,
      quantity: userDetails.selectVal,
      packed: false,
    };
    getData(newlyAdded);
    setUserDetails({ selectVal: 1, description: "" });
  };

  return (
    <form className="add-form" onSubmit={formSubmitHandler}>
      <h3>What do you need for your trip?</h3>
      <select
        value={userDetails.selectVal}
        onChange={(e) =>
          setUserDetails((prev) => ({
            ...prev,
            selectVal: +e.target.value,
          }))
        }
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map(
          (each, index) => {
            return (
              <option value={each} key={index}>
                {each}
              </option>
            );
          }
        )}
      </select>
      <input
        type="text"
        placeholder="Add Item"
        value={userDetails.description}
        onChange={(e) =>
          setUserDetails((prev) => ({ ...prev, description: e.target.value }))
        }
      />
      <button type="submit">Add</button>
    </form>
  );
}
function PackingList({ data, deleteHandler, checkHandler }) {
  return (
    <div className="list">
      <ul>
        {data.map((each, index) => (
          <Item
            key={each.id}
            item={each}
            deleteHandler={deleteHandler}
            checkHandler={checkHandler}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, deleteHandler, checkHandler }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => checkHandler(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => deleteHandler(item.id)}> ❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you already packed X (X%)</em>
    </footer>
  );
}
export default App;
