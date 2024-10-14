import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { initArrows, initToggle } from "./utils.js";
import AnimeListItem from "./component/AnimeListItem.jsx";
import FeatContainer from "./component/FeatContainer.jsx";
import MovieListItem from "./component/MovieListItem.jsx";
import FeatContaine from "./component/FeatContaine.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [selectedSearchPref, setSelectedSearchPref] = useState("M");
  const [searchQuery, setSearchQuery] = useState(""); // To store the input query

  function initArrows() {
    const arrows = document.querySelectorAll(".arrow");
    const movieLists = document.querySelectorAll(".movie-list");

    arrows.forEach((arrow, i) => {
      const itemNumber = movieLists[i].querySelectorAll("img").length;
      let clickCounter = 0;
      arrow.addEventListener("click", () => {
        const ratio = Math.floor(window.innerWidth / 270);
        clickCounter++;
        if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
          movieLists[i].style.transform = `translateX(${
            movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
          }px)`;
        } else {
          movieLists[i].style.transform = "translateX(0)";
          clickCounter = 0;
        }
      });

      // console.log(Math.floor(window.innerWidth / 270));
    });
  }

  function initToggle() {
    const ball = document.querySelector(".toggle-ball");
    const items = document.querySelectorAll(
      ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
    );

    if (ball) {
      ball.onclick = () => {
        console.log("Ball clicked!");
        items.forEach((item) => {
          item.classList.toggle("active");
          console.log(`Toggling active class on:`, item);
        });

        ball.classList.toggle("active");
        console.log("Toggling active class on ball");
      };
    } else {
      console.log("Ball not found!");
    }
  }
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://movies-anime-api.onrender.com/trending-movies",
          {
            timeout: 10000, // 10 seconds
          }
        );
        const trendingMovies = response.data;
        setMovies(trendingMovies);
        // console.log(trendingMovies);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          "https://movies-anime-api.onrender.com/popular-movies",
          {
            timeout: 10000, // 10 seconds
          }
        );
        const popularMovies = response.data;
        setPopularMovies(popularMovies);
        // console.log(popularMovies);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          "https://movies-anime-api.onrender.com/upcoming-movies",
          {
            timeout: 10000, // 10 seconds
          }
        );
        const upcomingMovies = response.data;
        setUpcomingMovies(upcomingMovies);
        // console.log(upcomingMovies);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchTrendingTV = async () => {
      try {
        const response = await axios.get("https://movies-anime-api.onrender.com/trending-tv", {
          timeout: 10000, // 10 seconds
        });
        const trendingTV = response.data;
        setTrendingTV(trendingTV);
        // console.log(trendingTV);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchPopularTV = async () => {
      try {
        const response = await axios.get("https://movies-anime-api.onrender.com/popular-tv", {
          timeout: 10000, // 10 seconds
        });
        const popularTV = response.data;
        setPopularTV(popularTV);
        // console.log(popularTV);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTrendingAnime = async () => {
      try {
        const response = await axios.get(
          "https://movies-anime-api.onrender.com/trending/anime",
          {
            timeout: 10000, // 10 seconds
          }
        );
        const trendingAnime = response.data;
        setTrendingAnime(trendingAnime);
        // console.log(trendingAnime);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPopularAnime = async () => {
      try {
        const response = await axios.get(
          "https://movies-anime-api.onrender.com/popular-anime",
          {
            timeout: 10000, // 10 seconds
          }
        );
        const popularAnime = response.data;
        setPopularAnime(popularAnime);
        // console.log(popularAnime);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUpcomingAnime = async () => {
      try {
        const response = await axios.get(
          "https://movies-anime-api.onrender.com/upcoming-anime",
          {
            timeout: 10000, // 10 seconds
          }
        );
        const upcomingAnime = response.data;
        setUpcomingAnime(upcomingAnime);
        // console.log(upcomingAnime);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingMovies();
    fetchPopularMovies();
    fetchUpcomingMovies();
    fetchTrendingTV();
    fetchPopularTV();
    fetchTrendingAnime();
    fetchPopularAnime();
    fetchUpcomingAnime();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    let url = "";

    // Redirect based on selected search preference
    if (selectedSearchPref === "M" || selectedSearchPref === "T") {
      url = `https://goku.sx/search?keyword=${encodeURIComponent(searchQuery)}`;
    } else if (selectedSearchPref === "A") {
      url = `https://hianime.to/search?keyword=${encodeURIComponent(
        searchQuery
      )}`;
    }
    if (url) {
      window.open(url, "_blank"); // Open the URL in a new tab
    } else {
      console.log("Invalid search preference or empty search query");
    }
  };

  const handleSelect = (e) => {
    setSelectedSearchPref(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <a href="#top" className="links">
              <h1 className="logo">WATCHER</h1>
            </a>
          </div>
          <div className="menu-container">
            <form>
              <ul className="menu-list">
                <li className="menu-list-item active">
                  <div className="dropdown">
                    <select
                      onChange={(e) => handleSelect(e)}
                      className="btn btn-secondary dropdown-toggle"
                    >
                      <option
                        className="dropdown-item"
                        value={"M"}
                        defaultChecked
                      >
                        Movies
                      </option>
                      <option className="dropdown-item" value={"A"}>
                        Anime
                      </option>
                      <option className="dropdown-item" value={"T"}>
                        TV Shows
                      </option>
                    </select>
                  </div>
                </li>
                <li className="menu-list-item active">
                  <input
                    type="text"
                    className="menu-list-item"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  ></input>
                  <button
                    type="submit"
                    className="btn"
                    onClick={(e) => handleSearch(e)}
                  >
                    {" "}
                    <i className="menu-list-item fas fa-search"></i>
                    Submit
                  </button>
                </li>
              </ul>
            </form>
          </div>
          <div className="profile-container">
            <div className="toggle">
              <i className="fas fa-sun toggle-icon"></i>
              <i className="fas fa-moon toggle-icon"></i>
              <div className="toggle-ball" onMouseDown={initToggle}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <a href="#top">
          <i className="left-menu-icon fas fa-home" title="Home"></i>
        </a>
        <a href="#movies">
          <i className="left-menu-icon fa-solid fa-film" title="Movies"></i>
        </a>
        <a href="#shows">
          <i className="left-menu-icon fas fa-tv" title="TV Shows"></i>
        </a>
        <a href="#anime">
          <i className="left-menu-icon fab fa-autoprefixer" title="Anime"></i>
        </a>
      </div>
      <div id="movies"></div>
      <div className="container">
        <div className="content-container">
          {/* <FeatContainer
            title={popularMovies[0]?.title || "DJANGO UNCHAINED"}
            imagesrc={popularMovies[0]?.backdrop_path || "img/f-1.jpg"}
          /> */}

          <FeatContainer
            title="Featured"
            images={[
              {
                src: popularMovies[0]?.backdrop_path,
                title: popularMovies[0]?.title,
                movieref: popularMovies[0]?.title,
              },
              {
                src: popularMovies[1]?.backdrop_path,
                title: popularMovies[1]?.title,
                movieref: popularMovies[1]?.title,
              },
              {
                src: popularMovies[2]?.backdrop_path,
                title: popularMovies[2]?.title,
                movieref: popularMovies[2]?.title,
              },
              {
                src: popularMovies[3]?.backdrop_path,
                title: popularMovies[3]?.title,
                movieref: popularMovies[3]?.title,
              },
              {
                src: popularMovies[4]?.backdrop_path,
                title: popularMovies[4]?.title,
                movieref: popularMovies[4]?.title,
              },
            ]}
          />
          <div className="movie-list-container">
            <h1 className="movie-list-title">TRENDING MOVIES</h1>
            <div className="movie-list-wrapper">
              <div className="movie-list">
                {movies.map((movie) => (
                  <MovieListItem
                    key={movie.id}
                    movieref={movie.title}
                    title={movie.title}
                    description={movie.overview}
                    imagesrc={movie.backdrop_path}
                  />
                ))}
              </div>
              <i
                className="fas fa-chevron-right arrow"
                onClick={initArrows()}
              ></i>
            </div>
          </div>
          <div className="movie-list-container">
            <h1 className="movie-list-title">POPULAR MOVIES</h1>
            <div className="movie-list-wrapper">
              <div className="movie-list">
                {popularMovies.map((movie) => (
                  <MovieListItem
                    key={movie.id}
                    movieref={movie.title}
                    title={movie.title}
                    description={movie.overview}
                    imagesrc={movie.backdrop_path}
                  />
                ))}
              </div>
              <i
                className="fas fa-chevron-right arrow"
                onClick={initArrows()}
              ></i>
            </div>
          </div>
          <div className="movie-list-container">
            <h1 className="movie-list-title">UPCOMING MOVIES</h1>
            <div className="movie-list-wrapper">
              <div className="movie-list">
                {upcomingMovies.map((movie) => (
                  <MovieListItem
                    key={movie.id}
                    movieref={movie.title}
                    title={movie.title}
                    description={movie.overview}
                    imagesrc={movie.backdrop_path}
                  />
                ))}
              </div>
              <i
                className="fas fa-chevron-right arrow"
                onClick={initArrows()}
              ></i>
            </div>
          </div>

          <div id="shows"></div>
          {/* <FeatContainer title={trendingTV[0]?.title || "DARK"} imagesrc={trendingTV[0]?.backdrop_path || "img/f-2.jpg"} /> */}
          <FeatContainer
            title="Featured"
            images={[
              {
                src: trendingTV[0]?.backdrop_path,
                title: trendingTV[0]?.title,
                movieref: trendingTV[0]?.title,
              },
              {
                src: trendingTV[1]?.backdrop_path,
                title: trendingTV[1]?.title,
                movieref: trendingTV[1]?.title,
              },
              {
                src: trendingTV[2]?.backdrop_path,
                title: trendingTV[2]?.title,
                movieref: trendingTV[2]?.title,
              },
              {
                src: trendingTV[3]?.backdrop_path,
                title: trendingTV[3]?.title,
                movieref: trendingTV[3]?.title,
              },
              {
                src: trendingTV[4]?.backdrop_path,
                title: trendingTV[4]?.title,
                movieref: trendingTV[4]?.title,
              },
            ]}
          />
          <div className="movie-list-container">
            <h1 className="movie-list-title">TRENDING TV SHOWS</h1>
            <div className="movie-list-wrapper">
              <div className="movie-list">
                {trendingTV.map((tv) => (
                  <MovieListItem
                    key={tv.id}
                    movieref={tv.title}
                    title={tv.title}
                    description={tv.overview}
                    imagesrc={tv.backdrop_path}
                  />
                ))}
              </div>
              <i
                className="fas fa-chevron-right arrow"
                onClick={initArrows()}
              ></i>
            </div>
          </div>
          <div className="movie-list-container">
            <h1 className="movie-list-title">POPULAR TV SHOWS</h1>
            <div className="movie-list-wrapper">
              <div className="movie-list">
                {popularTV.map((tv) => (
                  <MovieListItem
                    key={tv.id}
                    movieref={tv.title}
                    title={tv.title}
                    description={tv.overview}
                    imagesrc={tv.backdrop_path}
                  />
                ))}
              </div>
              <i
                className="fas fa-chevron-right arrow"
                onClick={initArrows()}
              ></i>
            </div>
          </div>

          <div id="anime"></div>
          {/* <FeatContainer title={"Apurva noob"} imagesrc={"img/f-2.jpg"} /> */}
          <FeatContaine
            title="Featured"
            images={[
              {
                src: trendingAnime[0]?.images[1],
                title: trendingAnime[0]?.titles.english_title,
                hrefHiAnime: trendingAnime[0]?.titles.english_title,
              },
              {
                src: trendingAnime[1]?.images[1],
                title: trendingAnime[1]?.titles.english_title,
                hrefHiAnime: trendingAnime[1]?.titles.english_title,
              },
              {
                src: trendingAnime[2]?.images[1],
                title: trendingAnime[2]?.titles.english_title,
                hrefHiAnime: trendingAnime[2]?.titles.english_title,
              },
              {
                src: trendingAnime[3]?.images[1],
                title: trendingAnime[3]?.titles.english_title,
                hrefHiAnime: trendingAnime[3]?.titles.english_title,
              },
              {
                src: trendingAnime[4]?.images[1],
                title: trendingAnime[4]?.titles.english_title,
                hrefHiAnime: trendingAnime[4]?.titles.english_title,
              },
            ]}
          />
          <div className="movie-list-container">
            <h1 className="movie-list-title">TRENDING ANIME</h1>
            <div className="movie-list-wrapper">
              <div className="movie-list">
                {trendingAnime.map((anime) => (
                  <AnimeListItem
                    key={anime.mal_id}
                    hrefHiAnime={anime.titles.english_title}
                    title={anime.titles.default_title}
                    // description={anime.synopsis}
                    imagesrc={anime.images[1]}
                  />
                ))}
              </div>
              <i
                className="fas fa-chevron-right arrow"
                onClick={initArrows()}
              ></i>
            </div>
          </div>
          <div className="movie-list-container">
            <h1 className="movie-list-title">POPULAR ANIME</h1>
            <div className="movie-list-wrapper">
              <div className="movie-list">
                {popularAnime.map((anime) => (
                  <AnimeListItem
                    key={anime.mal_id}
                    hrefHiAnime={anime.titles.english_title}
                    title={anime.titles.default_title}
                    // description={anime.synopsis}
                    imagesrc={anime.images[1]}
                  />
                ))}
              </div>
              <i
                className="fas fa-chevron-right arrow"
                onClick={initArrows()}
              ></i>
            </div>
          </div>
          <div className="movie-list-container">
            <h1 className="movie-list-title">UPCOMING ANIME</h1>
            <div className="movie-list-wrapper">
              <div className="movie-list">
                {upcomingAnime.map((anime) => (
                  <AnimeListItem
                    key={anime.mal_id}
                    hrefHiAnime={anime.titles.english_title}
                    title={anime.titles.default_title}
                    imagesrc={anime.images[1]}
                  />
                ))}
              </div>
              <i
                className="fas fa-chevron-right arrow"
                onClick={initArrows()}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
