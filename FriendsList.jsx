import React from "react";

import { initialFriends } from "./src/App";
import IndFriend from "./IndFriend";

function FriendsList() {
  return (
    <div>
      {initialFriends.map((each) => {
        return <IndFriend friend={each} key={each.id} />;
      })}
    </div>
  );
}

export default FriendsList;
