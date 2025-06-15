import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MovieModel } from "../../models/reduxModel";
import { MoviesService } from "../../services/MoviesService";
import SegmentedControl from "../SegmentedControl/SegmentedControl";
import MovieSkeleton from "./MovieSkeleton";
import "./Movies.scss";
import NotFound from "../NotFound/NotFound";

interface MoviesProps {
  isTopRated?: boolean;
}
function Movies({ isTopRated }: MoviesProps) {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<MovieModel[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState("grid");
  const ref = useRef<HTMLDivElement>(null);

  const getMovies = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        let data;
        if (searchParams.get("search")) {
          const searchTerm = searchParams.get("search") || "";
          const searchResult = await MoviesService.searchMovies(searchTerm);
          data = searchResult;
        } else {
          data = await MoviesService.getMovies(1, isTopRated);
        }
        setMovies(data.movies);
        setIsLoading(false);
        setError(null);
      } catch (error: any) {
        setIsLoading(false);
        setError(error.message || "Đã có lỗi xảy ra khi tải phim.");
      }
    }
  };

  useEffect(() => {
    getMovies();
  }, [searchParams, isTopRated]);

  const MovieRow = ({ movies }: { movies: MovieModel[] }) => {
    return (
      <div className={`movie-row ${viewMode === "list" ? "movies-list" : ""}`}>
        {movies.map((movie) => (
          <div
            className={`movie ${viewMode === "list" ? "movie-list-item" : ""}`}
            key={movie.id}
          >
            <Link to={`/movies/${movie.id}`}>
              <div className="movie-list-image">
                <LazyLoadImage
                  src={movie.poster}
                  alt={movie.title}
                  className="movie_image"
                  // delayTime={300}
                  effect="blur"
                  placeholder={<MovieSkeleton />}
                />
              </div>
              <div className="movie-list-details">
                <h3>{movie.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };
  const viewModeOptions = ["grid", "list"];

  const handleViewModeChange = (value: string) => {
    setViewMode(value);
  };

  return (
    <>
      {error ? (
        <div className="error">{error}</div>
      ) : isLoading ? (
        <div className="loading">
          <div
            className={`movie-row ${viewMode === "list" ? "movies-list" : ""}`}
          >
            {Array(movies.length ? movies.length - 1 : movies.length)
              .fill(null)
              .map((_, index) => (
                <div
                  className={`movie ${
                    viewMode === "list" ? "movie-list-item" : ""
                  }`}
                >
                  <MovieSkeleton key={index} />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <>
          <div className="view-mode-container">
            <SegmentedControl
              options={viewModeOptions}
              selectedValue={viewMode}
              onChange={handleViewModeChange}
            />
          </div>
          <div
            className={`movies-root ${
              viewMode === "list" ? "movies-list" : ""
            }`}
            ref={ref}
          >
            {!isLoading && movies.length === 0 ? (
              <NotFound />
            ) : (
              movies.map((movieRow, index) => (
                <MovieRow key={index} movies={movieRow} />
              ))
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Movies;
