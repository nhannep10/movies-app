import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieModel, MovieArrayModel, MovieCategory, MoviesModel } from '../models/reduxModel';

const initialMovieState: MovieArrayModel = {

  category: {
    id: 0,
    title: '',
  },

  categories: [],

  movies: {
    currentPage: 0,
    movies: [],
    totalNrOfPages: -1,
  },

  movieDetail: {
    id: '',
    title: '',
    overview: '',
    poster: ''
  },

  searchTerm: '',
  searchResults: [],
};

const movieSlice = createSlice({

  name: 'movie',

  initialState: initialMovieState,

  reducers: {
    setCategories(state, action: PayloadAction<MovieCategory[]>) {
      state.categories = action.payload;
    },
    setCategory(state, action: PayloadAction<MovieCategory>) {
      state.category = action.payload;
    },
    setMovies(state, action: PayloadAction<MoviesModel>) {
      state.movies.movies = action.payload.movies;
      state.movies.currentPage = action.payload.currentPage;
      state.movies.totalNrOfPages = action.payload.totalNrOfPages;
    },
    setMovieDetail(state, action: PayloadAction<MovieModel>) {
      state.movieDetail = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    clearMovieDetail(state) {
      state.movieDetail = {
        id: '',
        title: '',
        overview: '',
        poster: ''
      };
    },
  }
});

export default movieSlice;
export const movieActions = movieSlice.actions;
