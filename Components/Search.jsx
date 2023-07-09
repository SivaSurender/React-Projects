import React from "react";

function Search({ value, setValue }) {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}

export default Search;
