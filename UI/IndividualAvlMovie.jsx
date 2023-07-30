import React from "react";

function IndividualAvlMovie({ movie, selectMoviehandler }) {
  console.log(movie, "movie");
  return (
    <li onClick={() => selectMoviehandler(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default IndividualAvlMovie;
