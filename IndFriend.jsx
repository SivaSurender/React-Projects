import React from "react";

function IndFriend({
  friend,
  setShowSelected,
  setSelectedData,
  selectedData,
  showSelected,
  setShowAdd,
}) {
  return (
    <li
      className={
        selectedData.id && showSelected === friend.id ? "selected" : ""
      }
    >
      <img src={friend.image} alt={friend.name} />
      <h1>{friend.name}</h1>
      {friend.balance > 0 ? (
        <p className="red">
          {" "}
          You owe {friend.name} {Math.abs(friend.balance)}K
        </p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {" "}
          {friend.name} owes you {Math.abs(friend.balance)}K
        </p>
      ) : (
        <p className="">You and {friend.name} are even</p>
      )}
      <button
        onClick={(e) => {
          setShowAdd(false);
          setShowSelected((prev) => !prev);
          setSelectedData(friend);
        }}
        className="button"
      >
        {selectedData.id === friend.id && showSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

export default IndFriend;
