import React from "react";
import { Link } from "react-router-dom";
import twitch from "./images/twitch-logo-png-1883.png";
import youtube from "./images/youtube-logo-png-2075.png";

export const StatsCard = (props) => {
  return (
    <div className="stats_card">
      <div
        className="image"
        style={{
          background: "url(" + props.image + ") center / contain no-repeat",
        }}
      ></div>
      <p className="result">{props.stat}</p>
      <p className="title">
        <strong>{props.type}</strong>
      </p>
    </div>
  );
};

export const TeamCard = (props) => {
  return (
    <div className="team_card">
      <div
        className="image"
        style={{
          background: "url(" + props.image + ") center / contain no-repeat",
        }}
      ></div>
      <hr className="hruler" />
      <p className="team_name">{props.name}</p>
    </div>
  );
};

export const NewsCard = (props) => {
  return (
    <>
      <img
        className="card-img-top w-100 d-block image"
        src={props.image}
        alt="featured_media"
      />
      <div className="card-body">
        <h4 className="card-title">{props.title}</h4>
        <p className="card-text">{props.category}</p>
      </div>
    </>
  );
};

export const MatchCard = (props) => {
  // var date = new Date();
  return (
    <div className="match_card">
      <div className="inner">
        <div className="column1">
          <div className="image_section">
            <div
              className="team1"
              style={{
                background:
                  "url(" + props.team1 + ") center / contain no-repeat",
              }}
            ></div>
            <div className="vs_div">
              <div
                className="vs"
                style={{
                  background:
                    "url('./assets/img/vs.webp') center / contain no-repeat",
                }}
              ></div>
            </div>
            <div
              className="team2"
              style={{
                background:
                  "url(" + props.team2 + ") center / contain no-repeat",
              }}
            ></div>
          </div>
          {props.liveNow === "true" && props.liveUrl !== null ? (
            <>
              <p className="live_now">LIVE NOW</p>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="column2">
          <p className="tname">{props.tname}</p>
          <p className="timing">{props.beginAt}</p>
          <p className="mname">{props.mname}</p>
          <p className="timing">{props.endAt}</p>
        </div>
        <div className="column3">
          <p className="winner">winner</p>
          <p className="wname">{props.wname}</p>

          {props.liveUrl !== null ? (
            <>
              <p className="watch_live">
                <strong>watch live</strong>
                <br />
              </p>
              <div>
                <a href={props.liveUrl}>
                  <div
                    className="live_button"
                    style={{
                      background:
                        props.liveType == "twitch"
                          ? "url(" + twitch + ") center / contain no-repeat"
                          : props.liveType == "youtube"
                          ? "url(" + youtube + ") center / contain no-repeat"
                          : "",
                    }}
                  />
                </a>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export const TourCard = (props) => {
  return (
    <div>
      <div className="card-body">
        <div
          className="image"
          style={{
            background: "url(" + props.image + ") center / contain no-repeat",
          }}
        ></div>
        <div className="div">
          <p className="title">{props.title}</p>
        </div>
        <div className="div">
          <p className="left_text">Begin at:</p>
          <p className="right_text">{props.beginAt}</p>
        </div>
      </div>
    </div>
  );
};

export const GameCard = (props) => {
  return (
    <>
      <div className="spacer"></div>
      <div>
        <div className="stats">
          <h4 className="stat">Rpg</h4>
          <h4 className="stat">Strategy</h4>
        </div>
        <h4 className="title">{props.title}</h4>
      </div>
    </>
  );
};

//tournament page cards

export const TourHead = (props) => {
  return (
    <div className="tour_head">
      <p className="title">{props.title}</p>
    </div>
  );
};

export const TourDetailsDiv1 = (props) => {
  return (
    <div className="div">
      <p className="text">{props.title}</p>
    </div>
  );
};

export const TourDetailsDiv2 = (props) => {
  return (
    <div className="div2">
      <p className="left_text">{props.rightText}</p>
      <p className="right_text">{props.leftText}</p>
    </div>
  );
};

//card headers and stuff

export const HomepageHeaderImage = () => {
  return (
    <>
      <div className="home_bg">
        <div className="inner">
          <p className="pri_title">WELCOME TO</p>
          <p className="sec_title">Afterplay</p>
        </div>
      </div>
      <div className="bg_spacer"></div>
    </>
  );
};

export const PageHeaderImage = (props) => {
  return (
    <>
      <div
        className="bg"
        style={{
          background:
            "url(" +
            props.image +
            ") center / cover no-repeat,rgba(0, 0, 0, 0.71)",
        }}
      >
        <div className="inner">
          <p className="pri_title">{props.heading}</p>
          <p className="sec_title">{props.title}</p>
        </div>
      </div>
      <div className="bg_spacer"></div>
    </>
  );
};

export const SectionHeader = (props) => {
  return (
    <div className="container header_section">
      {props.viewMore === "true" ? (
        <>
          <div className="inner">
            <h1 className="title">{props.heading}</h1>
          </div>
          <div className="row">
            <div className="col">
              <h1 className="heading">{props.title}</h1>
            </div>
            <div style={{ width: "176px" }}>
              <Link to={props.link} className="button">
                view more&nbsp;→
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="inner">
            <h1 className="title_mid">{props.heading}</h1>
            <h1 className="heading_mid">{props.title}</h1>
          </div>
        </>
      )}
    </div>
  );
};
