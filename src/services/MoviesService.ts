import { MovieModel, MoviesModel } from "../models/reduxModel";
import { BASE_URL, POSTER_BASE_URL, API_KEY, DEFAULT_LANGUAGE, MOVIE_COUNT_PER_ROW, MOVIE_CATEGORY_TRENDING, URL_TRENDING_MOVIES } from "../constants";
import { chunk } from "../utils";


const getMovies = async (page: number, isTopRated: boolean = false): Promise<MoviesModel> => {
    
    let url = '';
    if (isTopRated) {
        url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${DEFAULT_LANGUAGE}&page=${page}`;
        
    } else {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${DEFAULT_LANGUAGE}&sort_by=popularity.desc&page=${page}&include_adult=false&include_video=false`;
    }

    const response = await fetch(url);
    const data = await response.json();    

    // Nếu không có kết quả, trả về dữ liệu mặc định
    if (!data?.results) {
        return {
            currentPage: 1,
            totalNrOfPages: 1,
            movies: []
        };
    }

    // Lấy thông tin của mỗi bộ phim
    const movies: MovieModel[] = data?.results?.map((movie: any) => {
        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster: `${POSTER_BASE_URL}/${movie.poster_path}`
        }
    });

    // Chia nhỏ các bộ phim thành từng nhóm
    const chunkedMovies = chunk(movies, MOVIE_COUNT_PER_ROW);

    const allMovies: MoviesModel = {
        currentPage: data?.page,
        totalNrOfPages: data?.total_pages,
        movies: chunkedMovies
    }    

    return allMovies;
}


const searchMovies = async (searchTerm: string, page: number = 1): Promise<MoviesModel> => {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${DEFAULT_LANGUAGE}&query=${searchTerm}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    // Nếu không có kết quả, trả về dữ liệu mặc định
    if (!data?.results) {
        return {
            currentPage: 1,
            totalNrOfPages: 1,
            movies: []
        };
    }

    // Lấy thông tin của mỗi bộ phim
    const movies: MovieModel[] = data?.results?.map((movie: any) => {
        return {
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster: `${POSTER_BASE_URL}/${movie.poster_path}`
        }
    });

    // Chia nhỏ các bộ phim thành từng nhóm
    const chunkedMovies = chunk(movies, MOVIE_COUNT_PER_ROW);

    const moviesByCategory: MoviesModel = {
        currentPage: data?.page,
        totalNrOfPages: data?.total_pages,
        movies: chunkedMovies
    }

    return moviesByCategory;
}


const getMovieDetail = async (movieId: string): Promise<MovieModel> => {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${DEFAULT_LANGUAGE}`;
    const response = await fetch(url);
    const data = await response.json();

    const movie: MovieModel = {
        id: data.id,
        title: data.title,
        overview: data.overview,
        poster: `${POSTER_BASE_URL}/${data.poster_path}`
    }

    return movie;
}

export const MoviesService = {
    getMovies,
    searchMovies,
    getMovieDetail
}
