import React, { useState } from "react";

function FormSplitBill({ selectedData, getSplitHandler }) {
  const [billVal, setBillVal] = useState(0);
  const [userPaying, setuserPaying] = useState("");
  const [myExp, setmyExp] = useState(0);

  const splitHandler = (e) => {
    e.preventDefault();
    if (!billVal && !userPaying) return;
    getSplitHandler(userPaying === "myself" ? myExp : -myExp);
  };

  return (
    <form className="form-split-bill" onSubmit={splitHandler}>
      <h2>Split a bill with {selectedData.name}</h2>

      <label>💰 Bill value</label>
      <input type="number" onChange={(e) => setBillVal(+e.target.value)} />

      <label>🧍‍♀️ Your expense</label>
      <input type="number" onChange={(e) => setmyExp(+e.target.value)} />

      <label>👫 X's expense</label>
      <input
        type="text"
        disabled
        value={billVal - myExp < 0 ? "Invalid Denomination" : billVal - myExp}
      />

      <label>🤑 Who is paying the bill</label>
      <select
        value={userPaying}
        onChange={(e) => setuserPaying(e.target.value)}
      >
        <option value="myself">You</option>
        <option value={selectedData.name}>{selectedData.name}</option>
      </select>

      <button className="button">Split Bill</button>
    </form>
  );
}

export default FormSplitBill;
