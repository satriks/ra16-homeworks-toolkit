import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movies } from "../models/models";
import axios from "axios";

interface DataState {
  movies: Movies[];
  favorite: [];
  favoriteId: [];
  movieDetail: null | {};
  isLoading: boolean;
  search: string;
  error: string | null;
}
const token = import.meta.env.VITE_TOKEN_OMDB;
const connect = axios.create({
  baseURL: `http://www.omdbapi.com/?apikey=${token}&`,
});

const data: DataState = {
  movies: [],
  favorite: [],
  favoriteId: [],
  movieDetail: null,
  isLoading: false,
  error: null,
  search: "",
};

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.search = "";
};

const removeFromArray = (arr, value) => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
};

export const getMovies = createAsyncThunk(
  "moves/getMoves",
  async function (search, { rejectWithValue }) {
    try {
      console.log(search);

      const res = await connect.get(``, { params: { s: search } });

      if (res.data.Response === "False") {
        throw new Error(res.data.Error);
      }

      return { res: res.data.Search, search };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMoviesDetail = createAsyncThunk(
  "moves/getMoviesDetail",
  async function (id, { rejectWithValue }) {
    try {
      const res = await connect.get(``, { params: { i: id.id } });

      if (res.data.Response === "False") {
        throw new Error(res.data.Error);
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const MovesSlice = createSlice({
  name: "movies",
  initialState: data,
  reducers: {
    addFavorite(state, action) {
      state.favorite.push(action.payload);
      state.favoriteId.push(action.payload.imdbID);
      console.log(state.favorite);
    },
    removeFavorite(state, action) {
      console.log(action.payload);

      state.favorite = state.favorite.filter(
        (movie) => movie.imdbID != action.payload.imdbID
      );
      removeFromArray(state.favoriteId, action.payload.imdbID);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload.res;
        state.search = action.payload.search;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMoviesDetail.fulfilled, (state, action) => {
        state.movieDetail = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getMoviesDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMovies.rejected, setError)
      .addCase(getMoviesDetail.rejected, setError);
  },
});

export const { addFavorite, removeFavorite } = MovesSlice.actions;

export default MovesSlice.reducer;
