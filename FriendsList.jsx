import React from "react";

import IndFriend from "./IndFriend";

function FriendsList({
  masterData,
  setShowSelected,
  setSelectedData,
  selectedData,
  showSelected,
  setShowAdd,
}) {
  return (
    <div>
      {masterData.map((each) => {
        return (
          <IndFriend
            friend={each}
            key={each.id}
            setShowSelected={setShowSelected}
            setSelectedData={setSelectedData}
            selectedData={selectedData}
            showSelected={showSelected}
            setShowAdd={setShowAdd}
          />
        );
      })}
    </div>
  );
}

export default FriendsList;
