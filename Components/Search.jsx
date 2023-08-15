import React, { useEffect, useRef } from "react";

function Search({ value, setValue }) {
  const searchElement = useRef();

  useEffect(() => {
    searchElement.current.focus();

    const callBck = function (e) {
      if (e.code === "Enter") {
        searchElement.current.blur();
      }
    };
    document.addEventListener("keydown", callBck);

    return () => document.removeEventListener("keydown", callBck);
  }, []);
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={searchElement}
      />
    </>
  );
}

export default Search;
