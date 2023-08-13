import React, { useEffect, useState } from "react";
const mainKey = "cb7279d0";
import StarComponent from "./StarComponent";
import Loader from "./Loader";
import { toast } from "react-toastify";

function SelectedMovieDetail({
  selectedMovieId,
  setWatched,
  handleCloseSelected,
  watched,
}) {
  const [movieById, setMovieById] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [userSetRating, setUserSetRating] = useState(0);

  // const controller = new AbortController();
  useEffect(() => {
    const getMoviebyId = async () => {
      setIsLoaded(true);
      try {
        const getIdQuery = await fetch(
          `https://www.omdbapi.com/?apikey=${mainKey}&i=${selectedMovieId}`
          // ,
          // { signal: controller.signal }
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

    // return () => controller.abort();
  }, [selectedMovieId]);

  // checks if the incoming movie has already added to the list and has a rating

  const initialRateChecker = (mid) => {
    console.log({ watched, mid }, "initialRateChecker");
    return watched.filter((each) => each.imdbID === mid);
  };

  // to add movies to watchlist
  const handleWatchedList = () => {
    if (initialRateChecker(movieById.imdbID).length > 0) {
      toast.error("Movie Already added to watchlist");
      return;
    }
    setWatched((prev) => {
      const { imdbRating, Title, Year, Poster, imdbID, Runtime } = movieById;
      return [
        ...prev,
        {
          imdbID,
          imdbRating: Number(imdbRating),
          userRating: userSetRating,
          Title,
          Year,
          Poster,
          runtime: Number(Runtime.split(" ").at(0)),
        },
      ];
    });
    toast.success("Movie added to watchlist !");
  };
  console.log(watched, "watched from selectred");
  return (
    <>
      {isLoaded ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button
              onClick={() => handleCloseSelected(selectedMovieId)}
              className="btn-back"
            >
              &larr;
            </button>

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
            <div className="">
              <StarComponent
                maxRating={10}
                size={20}
                userSetRating={userSetRating}
                setUserSetRating={setUserSetRating}
              />
              <button className="btn-add" onClick={() => handleWatchedList()}>
                Add to watched list
              </button>
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
