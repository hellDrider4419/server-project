import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Route } from "react-router";

export default function Header(props) {
  const [searchText, setSearchText] = useState("");
  const [Dmenu, setDmenu] = useState("none");
  return (
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
                        e.key === "Enter" ? history.push("/Search") : ""
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
                        history.push("/Search");
                      }}
                    ></button>
                  )}
                />
                {console.log(searchText == "" ? null : searchText)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
