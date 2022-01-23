import Header from "./component/Header.js";
import Footer from "./component/Footer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  LiveMatchPage,
  NewsPage,
  HomePage,
  PostsPage,
  GamesPage,
  SearchPage,
  TourDetailsPage,
  TourPage,
} from "./component/Pages";
import ScrollToTop from "./component/scrolltop";
import { useState } from "react";
import { ApiCall } from "./component/store/counterslice";
import { useDispatch } from "react-redux";

export default function App() {
  let url = "https://gamerbox.hopto.org/pythonapi/";
  const axios = require("axios");
  const dispatch = useDispatch();
  let TourApiList = [
    ["live_matches_today", "LiveMatchesData"],
    ["todays_tournaments", "todaysTour"],
    ["lol", "lol"],
    ["rl", "rl"],
    ["codmw", "codmw"],
    ["dota2", "dota2"],
    ["ow", "ow"],
    ["pubg", "pubg_pc"],
    ["r6siege", "r6siege"],
    ["todays_matches", "todaysMatches"],
  ];
  TourApiList?.map(async (e) => {
    axios.get(url + e[0] + ".json").then((response) => {
      dispatch(ApiCall([e[1], response.data]));
    });
  });
  const [searchText, setSearchText] = useState("");
  const [Dmenu, setDmenu] = useState("none");
  return (
    <>
      <Router>
        <div className="header">
          <div className="navigataion_bar">
            <div className="inner">
              <Link className="nav_btn  a" to="/">
                HOME
              </Link>
              <div
                className="nav_btn a"
                onClick={() => {
                  Dmenu == "none" ? setDmenu("grid") : setDmenu("none");
                }}
              >
                Other ▼
                <div
                  className="dropdown"
                  style={{
                    display: Dmenu,
                  }}
                >
                  <Link to="/Games" className="dbtn a">
                    games
                  </Link>
                  <hr className="hruler" />
                  <Link to="/News" className="dbtn a">
                    News
                  </Link>
                  <hr className="hruler" />
                  <Link to="/LiveMatches" className="dbtn a">
                    live matches
                  </Link>
                </div>
              </div>
              <p className="nav_btn a">logo</p>
              <Link to="/" className="nav_btn a">
                about
              </Link>
              <div className="searchBoxDiv">
                <div className="searchBoxinnerdiv">
                  <div className="searchBox ">
                    <Route
                      render={({ history }) => (
                        <input
                          className="searchInput"
                          type="text"
                          value={searchText}
                          placeholder="Search"
                          onChange={(e) => setSearchText(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter"
                              ? history.push("/Search/" + searchText)
                              : ""
                          }
                        />
                      )}
                    />

                    <Route
                      render={({ history }) => (
                        <button
                          type="button"
                          className="searchButton"
                          onClick={() => {
                            history.push("/Search/" + searchText);
                          }}
                        ></button>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollToTop />
        <Switch>
          <Route path="/Search/:value" component={SearchPage} />
          <Route path="/Post/:title" component={PostsPage} />
          <Route path="/Tournaments/:name" component={TourPage} />
          <Route path="/LiveMatches" component={LiveMatchPage} />
          <Route path="/Details/:game/:id" component={TourDetailsPage} />
          <Route path="/News" component={NewsPage} />
          <Route path="/Games" component={GamesPage} />
          <Route path="/" component={HomePage} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
