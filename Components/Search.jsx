import React, { useEffect, useRef } from "react";

function Search({ value, setValue }) {
  const searchElement = useRef();

  useEffect(() => {
    searchElement.current.focus();

    const callBck = function (e) {
      if (e.code === "Enter") {
        searchElement.current.blur();
      } else searchElement.current.focus();
    };
    document.addEventListener("keydown", callBck);

    return () => document.removeEventListener("keydown", callBck);
  }, []);
  return (
    <>
      <input
        className="search"
        type="search"
        placeholder="Search movies..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={searchElement}
      />
    </>
  );
}

export default Search;
