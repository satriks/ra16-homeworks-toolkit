import Movie from "../components/Move";
import { Link } from "react-router-dom";
import { useAppSelector } from "../models/hook";

export default function Favorite() {
  const favoriteList = useAppSelector((state) => state.data.favorite);

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
