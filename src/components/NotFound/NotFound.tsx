import React from "react";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="no-movies-found">
      <div className="icon">🎬</div>
      <h2>No Movies Found</h2>
      <p>Try a different search term or check back later.</p>
    </div>
  );
}

export default NotFound;
