import React, { useState } from "react";
import Logo from "../Logo";
import Search from "../Components/Search";
import Results from "../Components/Results";

function NavBar() {
  const [query, setQuery] = useState("");

  return (
    <>
      <nav className="nav-bar">
        <Logo />
        <Search value={query} setValue={setQuery} />
        <Results />
      </nav>
    </>
  );
}

export default NavBar;
