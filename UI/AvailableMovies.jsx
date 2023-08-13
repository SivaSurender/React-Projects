import React, { useState } from "react";

import IndividualAvlMovie from "./IndividualAvlMovie";

function AvailableMovies({ movies, selectMoviehandler }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen1((open) => !open)}
        >
          {isOpen1 ? "–" : "+"}
        </button>
        {isOpen1 && (
          <ul className="list list-movies">
            {movies?.map((movie) => (
              <IndividualAvlMovie
                movie={movie}
                key={movie.imdbID}
                selectMoviehandler={selectMoviehandler}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default AvailableMovies;
