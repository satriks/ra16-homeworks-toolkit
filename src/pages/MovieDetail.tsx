import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesDetail } from "../redux/MoviesSlice";
import { useParams } from "react-router-dom";
import Movie from "../components/Move";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

type Props = {};

export default function MovieDetail({}: Props) {
  const dispatch = useDispatch();
  const id = useParams();
  const movieDetail = useSelector((state) => state.data.movieDetail);
  const isLoading = useSelector((state) => state.data.isLoading);
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    dispatch(getMoviesDetail(id));
  }, []);

  console.log(movieDetail);
  // console.log(movieDetail.Rating, "this is rating");
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
              movieDetail.Ratings.map((rating) => <Rating data={rating} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
// постер фильма(Poster)
// название фильма(Title)
// год выпуска(Year)
// жанр(Genre)
// продолжительность(Runtime)
// режиссер(Director)
// актеры(Actors)
// рейтинг фильма(imdbRating)
