export type MovieCategory = {
    id: number,
    title: string
}

export type MovieModel = {
    id: string,
    title: string,
    overview: string,
    poster: string
}

export type MoviesModel = {
    totalNrOfPages: number,
    currentPage: number,
    movies: MovieModel[][],
}

export interface MovieArrayModel {
    movies: MoviesModel,
    categories: MovieCategory[],
    movieDetail: MovieModel,
    category: MovieCategory,
    searchResults: MovieModel[],
    searchTerm: string,
}