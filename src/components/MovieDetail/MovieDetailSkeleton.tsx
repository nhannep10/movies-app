import React from 'react';
import './MovieDetailSkeleton.scss';

const MovieDetailSkeleton = () => {
  return (
    <div className="movie-detail-skeleton">
      <div className="movie-image-skeleton"></div>
      <div className="movie-title-skeleton"></div>
      <div className="movie-overview-skeleton"></div>
    </div>
  );
};

export default MovieDetailSkeleton;