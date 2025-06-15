import React, { useRef } from "react";
import "./SearchBar.scss";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    const searchTerm = inputRef.current?.value.trim() || "";
    
    if (!searchTerm) {
      navigate({
        pathname: location.pathname,
      });
      return;
    }
    navigate({
      pathname: "/categories/now-playing",
      search: `?search=${encodeURIComponent(searchTerm)}`,
    });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="search..."
        ref={inputRef}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearchClick();
          }
        }}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}

export default SearchBar;
