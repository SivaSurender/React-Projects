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

  // checks if the incoming movie has already added to the list and has a rating

  useEffect(() => {
    const controller = new AbortController();
    const getMoviebyId = async () => {
      setIsLoaded(true);
      try {
        const getIdQuery = await fetch(
          `https://www.omdbapi.com/?apikey=${mainKey}&i=${selectedMovieId}`,
          { signal: controller.signal }
        );
        const idJson = await getIdQuery.json();

        setMovieById(idJson);
      } catch (e) {
      } finally {
        setIsLoaded(false);
      }
    };

    getMoviebyId();

    return () => controller.abort();
  }, [selectedMovieId]);

  // to update doc title

  useEffect(() => {
    if (!movieById) return;

    document.title = movieById.Title;

    // clnup and using stock doc title

    return () => (document.title = "Pop Movies");
  }, [movieById.Title]);

  // to close selectemovie pane on pressing ESC key

  useEffect(function () {
    const escCallBack = function (event) {
      if (event.code === "Escape") {
        handleCloseSelected(selectedMovieId);
      }
    };
    document.addEventListener("keydown", escCallBack);

    return function () {
      document.removeEventListener("keydown", escCallBack);
    };
  }, []);

  // checks if the movie is already rated

  const rateIdentifier = () => {
    return watched?.find((each) => {
      if (each.imdbID === movieById.imdbID) {
        return each;
      }
    })?.userRating;
  };

  const initialRateChecker = (mid) =>
    watched.filter((each) => {
      if (each.imdbID === mid) {
        if (each.userRating === userSetRating) {
          return true;
        }
      }
    });

  // to add movies to watchlist
  const handleWatchedList = () => {
    if (initialRateChecker(movieById.imdbID).length > 0) {
      toast.error("Movie Already added to watchlist");
      //close the pane even if its error
      handleCloseSelected(selectedMovieId);
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
    // close the pane after its added
    handleCloseSelected(selectedMovieId);
  };

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
            {rateIdentifier() ? (
              <div className="rating">
                <span>
                  {`You have already rated this movie ${rateIdentifier()}`} ⭐
                </span>
              </div>
            ) : (
              <div className="">
                <StarComponent
                  maxRating={10}
                  size={20}
                  userSetRating={userSetRating}
                  setUserSetRating={setUserSetRating}
                />
                {userSetRating > 0 && (
                  <button
                    className="btn-add"
                    onClick={() => handleWatchedList()}
                  >
                    Add to watched list
                  </button>
                )}
              </div>
            )}

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
