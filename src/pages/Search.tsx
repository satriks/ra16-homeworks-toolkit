import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../redux/MoviesSlice";
import Movie from "../components/Move";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

type Props = {};

export default function Search({}: Props) {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.data.movies);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);
  const [text, setText] = useState("");
  const search = useSelector((state) => state.data.search);

  useEffect(() => {
    setText(search);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  // if (error) {
  //   return <ErrorMessage error={error} />;
  // }

  return (
    <div>
      <form
        className="search-form"
        onSubmit={(evt) => {
          evt.preventDefault();
          if (evt.target.search_input.value.trim()) {
            dispatch(getMovies(evt.target.search_input.value));
          }
        }}
      >
        <input
          type="text"
          id="search_input"
          value={text}
          onChange={(e: React.ChangeEvent) => {
            const target = e.target as HTMLFormElement;
            setText(target.value);
          }}
        />
        <button>Найти</button>
      </form>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <div className="search_list">
          {movies.map((movie) => (
            <Link to={`/movies/${movie.imdbID}`} key={movie.imdbID}>
              <Movie movie={movie} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
