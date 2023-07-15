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

function StarComponent({ ratingCount = 5 }) {
  const [ratedNum, setRatedNum] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  return (
    <div style={mainContainer}>
      <div style={{ display: "flex" }}>
        {Array.from({ length: ratingCount }, (_, index) => (
          <Star
            key={index}
            manageRevertOnChange={() => setTempRating(0)}
            manageOnChange={() => setTempRating(index + 1)}
            manageRating={() => setRatedNum(index + 1)}
            full={tempRating ? tempRating >= index + 1 : ratedNum >= index + 1}
          />
        ))}
      </div>
      <p style={textStyle}>{ratedNum || tempRating || ""}</p>
    </div>
  );
}

export default StarComponent;
