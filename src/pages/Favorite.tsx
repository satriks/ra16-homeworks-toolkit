import React from "react";
import { useSelector } from "react-redux";
import Movie from "../components/Move";
import { Link } from "react-router-dom";

type Props = {};

export default function Favorite({}: Props) {
  const favoriteList = useSelector((state) => state.data.favorite);

  console.log(favoriteList);

  if (!favoriteList.length) return <div>Нет фильмов в избранном</div>;

  return (
    <div className="favorite_list">
      {favoriteList.map((movie) => (
        <Link to={`/movies/${movie.imdbID}`} key={movie.imdbID}>
          <Movie movie={movie} />
        </Link>
      ))}
    </div>
  );
}
