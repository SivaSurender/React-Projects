import React, { useState } from "react";
import Star from "./Star";
const mainContainer = {
  display: "flex",
  alignItems: "center",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

function StarComponent({ ratingCount = 5, userSetRating, setUserSetRating }) {
  const [tempRating, setTempRating] = useState(0);

  return (
    <div style={mainContainer}>
      <div style={{ display: "flex" }}>
        {Array.from({ length: ratingCount }, (_, index) => (
          <Star
            key={index}
            manageRevertOnChange={() => setTempRating(0)}
            manageOnChange={() => setTempRating(index + 1)}
            manageRating={() => {
              setUserSetRating(index + 1);
            }}
            full={
              tempRating ? tempRating >= index + 1 : userSetRating >= index + 1
            }
          />
        ))}
      </div>
      <p style={textStyle}>{userSetRating || tempRating || ""}</p>
    </div>
  );
}

export default StarComponent;
