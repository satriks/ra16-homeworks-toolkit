import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite, removeFavorite } from "../redux/MoviesSlice";

type Props = {};

export default function Movie({ movie }: Props) {
  // const favorite = useSelector((state) => state.data.favorite);
  const favoriteId = useSelector((state) => state.data.favoriteId);

  const isFavorite = favoriteId.indexOf(movie.imdbID) != -1;
  const dispatch = useDispatch();

  return (
    <div className="movie">
      <img src={movie.Poster} alt="" />
      <h2>{movie.Title}</h2>
      <span>Год : {movie.Year}</span>
      <span>Тип : {movie.Type}</span>
      <button
        className={
          isFavorite
            ? "movie__favorite-active movie__favorite"
            : "movie__favorite"
        }
        onClick={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          dispatch(isFavorite ? removeFavorite(movie) : addFavorite(movie));
        }}
      >
        ★
      </button>
    </div>
  );
}

// ☆

// ★
