import React, { useState } from "react";

import AvailableMovies from "./AvailableMovies";
import WatchedMovies from "./WatchedMovies";

function MainScreen({ movies }) {
  return (
    <>
      <main className="main">
        <AvailableMovies movies={movies} />
        <WatchedMovies />
      </main>
    </>
  );
}

export default MainScreen;
