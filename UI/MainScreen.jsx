import React, { useState } from "react";

import AvailableMovies from "./AvailableMovies";
import WatchedMovies from "./WatchedMovies";
import Loader from "./Loader";
import ErrorLoader from "./ErrorLoader";
import SelectedMovieDetail from "./SelectedMovieDetail";

function MainScreen({
  movies,
  isLoading,
  watched,
  setWatched,
  error,
  selectedMovieId,
  selectMoviehandler,
  handleCloseSelected,
  handleDelete,
}) {
  return (
    <>
      <main className="main">
        {isLoading ? (
          <Loader />
        ) : error.length > 0 ? (
          <ErrorLoader error={error} />
        ) : (
          <AvailableMovies
            movies={movies}
            selectMoviehandler={selectMoviehandler}
          />
        )}
        {selectedMovieId ? (
          <SelectedMovieDetail
            selectedMovieId={selectedMovieId}
            handleCloseSelected={handleCloseSelected}
            setWatched={setWatched}
            watched={watched}
          />
        ) : (
          <WatchedMovies watched={watched} handleDelete={handleDelete} />
        )}
      </main>
    </>
  );
}

export default MainScreen;
