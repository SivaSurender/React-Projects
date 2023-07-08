import React from "react";

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👫 Friend name</label>
      <input type="text" />

      <label>🌄 Image URL</label>
      <input type="text" />

      <button className="button">Add</button>
    </form>
  );
}

export default FormAddFriend;
