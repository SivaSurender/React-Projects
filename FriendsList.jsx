import React from "react";

import IndFriend from "./IndFriend";

function FriendsList({ masterData }) {
  return (
    <div>
      {masterData.map((each) => {
        return <IndFriend friend={each} key={each.id} />;
      })}
    </div>
  );
}

export default FriendsList;
