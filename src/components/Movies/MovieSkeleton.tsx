import React from 'react';
import './MovieSkeleton.scss';

const MovieSkeleton = () => {
  return (
    <div className="movie-skeleton">
      <div className="movie-skeleton-image"></div>
      <div className="movie-skeleton-title"></div>
    </div>
  );
};

export default MovieSkeleton;