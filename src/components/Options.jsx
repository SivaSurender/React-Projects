import React from "react";

function Options({ options }) {
  return (
    <div className="options">
      {options?.map((each) => {
        return (
          <button className="btn btn-option" key={each}>
            {each}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
