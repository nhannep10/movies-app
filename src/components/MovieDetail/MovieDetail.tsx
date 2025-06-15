import { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchMovieById } from '../../store/movieActions';
import movieSlice from '../../store/movieSlice';
import './MovieDetail.scss';
import MovieDetailSkeleton from './MovieDetailSkeleton';

export default function MovieDetail() {

    const { movieId } = useParams();
    const movie = useAppSelector(state => state.movieSlice.movieDetail);
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

   useEffect(() => {
    dispatch(movieSlice.actions.clearMovieDetail()); // ✅ Reset trước
    dispatch(fetchMovieById(movieId!));

    return () => {
        dispatch(movieSlice.actions.setSearchTerm(''));
    };
}, [movieId])

    return (
        <div className='move-detail-container'>
            {movie && movie.title ? (
                <div className='movie-details-root'>
                    <LazyLoadImage
                        alt={movie.title}
                        className='movie-image'
                        src={movie.poster}
                        effect="blur"
                    />
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                </div>
            ) : (
                <div className='movie-details-root'><MovieDetailSkeleton/></div>
            )}
            <div className='back-button'>
                <button onClick={() => { navigate(-1) }}>Back</button>
            </div>
        </div>
    );
}
