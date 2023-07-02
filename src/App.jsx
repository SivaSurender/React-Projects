import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 10, packed: false },
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
      <Stats data={data} />
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
  const [sortValue, setSortValue] = useState("input");

  let sortedItems;

  if (sortValue === "input") sortedItems = data;
  if (sortValue === "description") {
    sortedItems = data
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortValue === "packed") {
    sortedItems = data.slice().sort((a, b) => +a.packed - +b.packed);
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((each, index) => (
          <Item
            key={each.id}
            item={each}
            deleteHandler={deleteHandler}
            checkHandler={checkHandler}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        >
          <option value="input"> Sort by Input</option>
          <option value="description"> Sort by Description</option>
          <option value="packed"> Sort by Packing Status</option>
        </select>
      </div>
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

function Stats({ data }) {
  const packed = data.filter((each) => each.packed).length;
  const percent = Math.round((packed / data.length) * 100);
  return (
    <footer className="stats">
      <em>
        {data.length === 0
          ? "Add items to the list to get started"
          : percent === 100
          ? "You're all set✈"
          : `You have ${data.length} items on your list and you already packed ${packed} (${percent}%)`}
      </em>
    </footer>
  );
}
export default App;
