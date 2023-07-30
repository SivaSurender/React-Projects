import React, { useState } from "react";

import AvailableMovies from "./AvailableMovies";
import WatchedMovies from "./WatchedMovies";
import Loader from "./Loader";
import ErrorLoader from "./ErrorLoader";

function MainScreen({ movies, isLoading, error }) {
  console.log(isLoading, "load");
  return (
    <>
      <main className="main">
        {isLoading ? (
          <Loader />
        ) : error.length > 0 ? (
          <ErrorLoader error={error} />
        ) : (
          <AvailableMovies movies={movies} />
        )}
        <WatchedMovies />
      </main>
    </>
  );
}

export default MainScreen;
