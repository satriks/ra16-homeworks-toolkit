import { useEffect } from "react";
import { v4 } from "uuid";
import { getMoviesDetail } from "../redux/MoviesSlice";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../models/hook";

export default function MovieDetail() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const movieDetail = useAppSelector((state) => state.data.movieDetail);
  const isLoading = useAppSelector((state) => state.data.isLoading);
  const error = useAppSelector((state) => state.data.error);

  useEffect(() => {
    if (id) {
      dispatch(getMoviesDetail({ id: id }));
    }
  }, [dispatch, id]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (isLoading || !movieDetail) {
    return <Loading />;
  }

  return (
    <div className="detail__wrapper">
      <h2>{movieDetail.Title}</h2>
      <div className="detail">
        <img src={movieDetail.Poster} alt="" />
        <div className="detail__info">
          <span>Год : {movieDetail.Year}</span>
          <span>Жанр : {movieDetail.Genre}</span>
          <span>Продолжительность : {movieDetail.Runtime}</span>
          <span>Режиссер : {movieDetail.Director}</span>
          <span>Актеры : {movieDetail.Actors}</span>
          <div>
            Ratings :
            {movieDetail &&
              movieDetail.Ratings.map((rating) => (
                <Rating data={rating} key={v4()} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
