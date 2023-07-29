import React, { useState } from "react";

import AvailableMovies from "./AvailableMovies";
import WatchedMovies from "./WatchedMovies";
import Loader from "./Loader";

function MainScreen({ movies, isLoading }) {
  return (
    <>
      <main className="main">
        {isLoading ? <Loader /> : <AvailableMovies movies={movies} />}
        <WatchedMovies />
      </main>
    </>
  );
}

export default MainScreen;
