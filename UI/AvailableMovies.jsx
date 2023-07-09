import React, { useState } from "react";
import { tempMovieData } from "../src/App";
import IndividualAvlMovie from "./IndividualAvlMovie";

function AvailableMovies({ movies }) {
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
          <ul className="list">
            {movies?.map((movie) => (
              <IndividualAvlMovie movie={movie} key={movie.imdbID} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default AvailableMovies;
