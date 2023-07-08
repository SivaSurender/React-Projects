export const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

import React, { useState } from "react";
import FriendsList from "../FriendsList";
import FormSplitBill from "../FormSplitBill";
import FormAddFriend from "../FormAddFriend";

function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [masterData, setMasterData] = useState(initialFriends);
  const [showSelected, setShowSelected] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const getMasterData = (data) => {
    setMasterData((prev) => [...prev, data]);
    setShowAdd(false);
  };

  const getSplitHandler = (data) => {
    console.log(data);
    setMasterData((prev) => {
      return prev.map((each) => {
        return each.id === selectedData.id
          ? { ...each, balance: each.balance + data }
          : each;
      });
    });
  };
  console.log(masterData, "mas");

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          masterData={masterData}
          setShowSelected={setShowSelected}
          setSelectedData={setSelectedData}
          selectedData={selectedData}
          showSelected={showSelected}
          setShowAdd={setShowAdd}
        />
        {showAdd && <FormAddFriend getMasterData={getMasterData} />}
        <button className="button" onClick={() => setShowAdd((prev) => !prev)}>
          {showAdd ? "Close" : "Add Friend"}
        </button>
      </div>
      {showSelected && (
        <FormSplitBill
          selectedData={selectedData}
          getSplitHandler={getSplitHandler}
        />
      )}
    </div>
  );
}

export default App;
