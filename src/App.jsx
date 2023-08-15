import { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import MainScreen from "../UI/MainScreen";
import Search from "../Components/Search";
import Results from "../Components/Results";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mainKey = "cb7279d0";

// export const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

export const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const [watched, setWatched] = useState(() => {
    const initailizeWatchData = JSON.parse(
      localStorage.getItem("getWatchedlist")
    );
    return initailizeWatchData;
  });

  const selectMoviehandler = (id) => {
    setSelectedMovieId((prev) => {
      if (id === prev) {
        return null;
      }
      return id;
    });
  };

  const handleCloseSelected = () => {
    setSelectedMovieId(null);
  };

  const handleDelete = (feededId) => {
    setWatched((prev) => {
      return prev.filter((each) => each.imdbID !== feededId);
    });

    // delete from local

    const temp = JSON.parse(localStorage.getItem("getWatchedlist"))?.filter(
      (each) => each.imdbID !== feededId
    );
    localStorage.removeItem("getWatchedlist");

    // set new updated in local

    localStorage.setItem("getWatchedlist", JSON.stringify(temp));
  };

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const initiReq = await fetch(
          `https://www.omdbapi.com/?apikey=${mainKey}&s=${query}`,
          { signal: controller.signal }
        );
        const modJson = await initiReq.json();

        if (modJson.Response === "False") {
          setError(modJson.Error);
          throw new Error(modJson.Error);
        }
        setMovies(modJson?.Search);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    getData();
    return () => controller.abort();
  }, [query]);

  return (
    <>
      <ToastContainer />
      <NavBar>
        <Search value={query} setValue={setQuery} />
        <Results movies={movies} />
      </NavBar>
      <MainScreen
        movies={movies}
        isLoading={isLoading}
        error={error}
        selectedMovieId={selectedMovieId}
        selectMoviehandler={selectMoviehandler}
        handleCloseSelected={handleCloseSelected}
        watched={watched}
        setWatched={setWatched}
        handleDelete={handleDelete}
      />
      {/* <StarComponent ratingCount={20} /> */}
    </>
  );
}
