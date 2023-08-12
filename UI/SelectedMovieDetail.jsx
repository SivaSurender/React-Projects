import React, { useEffect, useState } from "react";
const mainKey = "cb7279d0";
import StarComponent from "./StarComponent";

function SelectedMovieDetail({ selectedMovieId, handleCloseSelected }) {
  const [movieById, setMovieById] = useState({});

  const controller = new AbortController();
  useEffect(() => {
    const getMoviebyId = async () => {
      try {
        const getIdQuery = await fetch(
          `https://www.omdbapi.com/?apikey=${mainKey}&i=${selectedMovieId}`,
          { signal: controller.signal }
        );
        const idJson = await getIdQuery.json();
        console.log(idJson, "idjson");
        setMovieById(idJson);
      } catch (e) {
        console.log(e);
      }
    };
    getMoviebyId();

    return () => controller.abort();
  }, [selectedMovieId]);
  return (
    <div className="details">
      <header>
        <button
          onClick={() => handleCloseSelected(selectedMovieId)}
          className="btn-back"
        >
          &larr;
        </button>
        <img src={movieById.Poster} alt={`Poster of the ${movieById.Title} `} />
        <div className="details-overview">
          <h2>{movieById.Title}</h2>
          <p>
            {movieById.Released} &bull; {movieById.Runtime}
          </p>
          <p>{movieById.genre}</p>
          <p>
            <span>⭐</span>
            {movieById.imdbRating} IMDB Rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarComponent maxRating={10} size={24} />
        </div>
        <p>
          <p>
            <em>{movieById.Plot}</em>
          </p>
          <p>Starring {movieById.Actors}</p>
          <p>Directed by {movieById.Director}</p>
        </p>
      </section>
    </div>
  );
}

export default SelectedMovieDetail;
