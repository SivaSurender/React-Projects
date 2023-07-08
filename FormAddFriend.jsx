import React, { useState } from "react";

function FormAddFriend({ getMasterData }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    image: "",
    balance: 0,
  });

  const addFriendHandle = (e) => {
    if (!user.name) return;
    e.preventDefault();
    const Obj = {
      ...user,
      id: crypto.randomUUID(),
      balance: 0,
      image: `https://i.pravatar.cc/48?u=499476?=${crypto.randomUUID()}`,
    };
    setUser(Obj);

    console.log(user);
    getMasterData(Obj);
    setUser({ id: "", name: "", image: "", balance: 0 });
  };
  console.log(user);
  return (
    <form className="form-add-friend" onSubmit={(e) => addFriendHandle(e)}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
      />

      <label>🌄 Image URL</label>
      <input type="text" value={user.image} />

      <button className="button">Add</button>
    </form>
  );
}

export default FormAddFriend;
