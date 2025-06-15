import "./App.scss";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import TabBar from "./components/TabBar/TabBar";
import SearchBar from "./components/SearchBar/SearchBar";
import Movies from "./components/Movies/Movies";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";


function App() {
  const tabs = [
    {
      id: "now-playing",
      label: "Now Playing",
      path: "/categories/now-playing",
    },
    { id: "top-rated", label: "Top Rated", path: "/categories/top-rated" },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <TabBar tabs={tabs} />
          <SearchBar />
        </div>
        <Routes>
        <Route path="/" element={<Navigate to="/categories/now-playing" />} />
        <Route
            key="/categories/now-playing"
            path="/categories/now-playing"
            element={<Movies />}
          />
          <Route
            key="/categories/top-rated"
            path="/categories/top-rated"
            element={<Movies isTopRated={true} />}
          />
          <Route path="movies/:movieId" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}
export default App;
