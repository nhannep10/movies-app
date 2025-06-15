import movieSlice from './movieSlice'
import { AnyAction } from '@reduxjs/toolkit'
import { ThunkAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { MovieCategory, MovieModel, MoviesModel } from "../models/reduxModel";
import { MoviesService } from "../services/MoviesService";

export const movieActions = movieSlice.actions

export const fetchMovies = (page: number, isTopRated: boolean = false): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {

        const response: MoviesModel = await MoviesService.getMovies(page, isTopRated);

        dispatch(movieActions.setMovies(response));
    }
}


export const fetchMovieById = (movieId: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        try {
            const movieDetail = await MoviesService.getMovieDetail(movieId);
            dispatch(movieActions.setMovieDetail(movieDetail));
        } catch (error: any) {
            console.error("Error fetching movie detail:", error);
        }
    }
}
