import React, { useEffect, useState } from "react";
const mainKey = "cb7279d0";
import StarComponent from "./StarComponent";
import Loader from "./Loader";

function SelectedMovieDetail({ selectedMovieId, handleCloseSelected }) {
  const [movieById, setMovieById] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const controller = new AbortController();
  useEffect(() => {
    const getMoviebyId = async () => {
      setIsLoaded(true);
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
      } finally {
        setIsLoaded(false);
      }
    };
    getMoviebyId();

    return () => controller.abort();
  }, [selectedMovieId]);
  return (
    <>
      {isLoaded ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            {/* <button
              onClick={() => handleCloseSelected(selectedMovieId)}
              className="btn-back"
            >
              &larr;
            </button> */}

            <img
              src={movieById.Poster}
              alt={`Poster of the ${movieById.Title} `}
            />
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
      )}
    </>
  );
}

export default SelectedMovieDetail;
