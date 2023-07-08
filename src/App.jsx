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

  const getMasterData = (data) => {
    setMasterData((prev) => [...prev, data]);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList masterData={masterData} />
        {showAdd && <FormAddFriend getMasterData={getMasterData} />}
        <button className="button" onClick={() => setShowAdd((prev) => !prev)}>
          {showAdd ? "Close" : "Add Friend"}
        </button>
      </div>
      <FormSplitBill />
    </div>
  );
}

export default App;
