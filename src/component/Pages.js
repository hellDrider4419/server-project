/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import React from "react";
import { Link } from "react-router-dom";
import {
  GameCard,
  NewsCard,
  StatsCard,
  TeamCard,
  SectionHeader,
  PageHeaderImage,
  HomepageHeaderImage,
  TourHead,
  TourDetailsDiv1,
  TourDetailsDiv2,
} from "./Cards";

import NewsData from "../gamersbox-ee716-default-rtdb-export.json";
import games from "./games.json";
// import rl from "./rl.json";
// import codmw from "./codmw.json";
// import dota2 from "./dota2.json";
// import ow from "./ow.json";
// import pubg_pc from "./pubg.json";
// import r6siege from "./r6siege.json";
// import todaysMatches from "./todays_matches.json";
// import todaysTour from "./todays_tournaments.json";
// import lol from "./lol.json";
// import LiveMatchesData from "./live_matches_today.json";
import {
  GeneralMatchCardFun,
  todaysMatchCardFun,
  matchCardFun,
  tourCardFun,
} from "./CardCalling";
import {
  SearchTournaments,
  searchTodaysMatchCard,
  tour,
  // setTour,
} from "./searchEngine";
import Header from "./images/header.jpg";
import image1 from "./images/1.webp";
import image2 from "./images/2.webp";
import image3 from "./images/3.webp";
import image4 from "./images/4.webp";
import { useState, useEffect } from "react";
import { db, titleList } from "../firebasseconfig";
import { ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const date = new Date();
let postData = [];
export const HomePage = () => {
  let database = useSelector((state) => state.apiData);
  console.log(database);

  let [rd, setRd] = useState([]);

  useEffect(() => {
    onValue(ref(db, "Posts"), (snapshot) => {
      setRd(snapshot.val());
      postData = snapshot.val();
    });
  }, [titleList]);

  var matchCount = 0;
  return (
    <>
      <HomepageHeaderImage />
      <div className="page_body">
        <div className="inner_page_body">
          <div className="section">
            <div className="card-group">
              <SectionHeader
                title="Games"
                heading="Tournaments"
                viewMore="true"
                link="/Games"
              />
              {games?.length
                ? games?.slice(0, 4)?.map((e) => (
                    <Link
                      key={e.name}
                      to={"/Tournaments/" + e.file}
                      className="game_card a"
                      style={{
                        background:
                          "url('./assets/img/" +
                          e.image +
                          "') center / cover no-repeat,rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <GameCard title={e.name} />
                    </Link>
                  ))
                : ""}
              <SectionHeader
                title="Latest"
                heading="News"
                viewMore="true"
                link="/News"
              />
              {rd?.length
                ? rd?.map((e) => {
                    return (
                      <Link
                        to={{
                          pathname: "/Post/" + e["Post Title"],
                          postProps: e,
                        }}
                        key={e["Post Title"]}
                        className="a news_card"
                      >
                        <NewsCard
                          title={e["Post Title"]}
                          category={e.date}
                          image={e["Featured Media URL"]}
                        />
                      </Link>
                    );
                  })
                : ""}

              <SectionHeader
                title="Live Matches"
                heading="matches"
                viewMore="true"
                link="/LiveMatches"
              />
              {database.LiveMatchesData?.length
                ? database.LiveMatchesData?.map((e) => {
                    e.begin_at !== null
                      ? (e.begin_at = new Date(e.begin_at))
                      : null;
                    e.end_at !== null ? (e.end_at = new Date(e.end_at)) : null;
                    return matchCount < 3 &&
                      e.begin_at !== null &&
                      String(e.begin_at).substring(0, 15) ===
                        String(date).substring(0, 15)
                      ? e.end_at === null &&
                        e.begin_at.getTime() <= date.getTime()
                        ? matchCardFun(e, "true", matchCount++)
                        : e.end_at !== null &&
                          e.begin_at.getTime() <= date.getTime() &&
                          e.end_at.getTime() >= date.getTime()
                        ? matchCardFun(e, "true", matchCount++)
                        : ""
                      : "";
                  })
                : ""}
              {database.LiveMatchesData?.length
                ? database.LiveMatchesData?.map((e) => {
                    e.begin_at !== null
                      ? (e.begin_at = new Date(e.begin_at))
                      : null;
                    e.end_at !== null ? (e.end_at = new Date(e.end_at)) : null;

                    return matchCount < 3 &&
                      e.begin_at !== null &&
                      String(e.begin_at).substring(0, 15) ===
                        String(date).substring(0, 15)
                      ? e.end_at === null &&
                        e.begin_at.getTime() > date.getTime()
                        ? matchCardFun(e, "false", matchCount++)
                        : e.end_at !== null &&
                          (e.begin_at.getTime() > date.getTime() ||
                            e.end_at.getTime() < date.getTime())
                        ? matchCardFun(e, "false", matchCount++)
                        : ""
                      : "";
                  })
                : ""}
              <SectionHeader
                title="todays tournaments"
                heading="tournaments"
                viewMore="true"
                link="/Games"
              />
              {database.todaysTour?.length
                ? database.todaysTour?.slice(0, 3)?.map((e) => {
                    e.begin_at !== null
                      ? (e.begin_at = new Date(e.begin_at))
                      : (e.begin_at = null);
                    return tourCardFun(e, e.gamequery);
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const LiveMatchPage = () => {
  let LiveMatchesData = useSelector((state) => state.apiData.LiveMatchesData);
  return (
    <>
      <PageHeaderImage
        image={Header}
        heading="Watch Now"
        title="LIVE MATCHES"
      />
      <div className="page_body">
        <div className="inner_page_body">
          <div className="section">
            <div className="card-group">
              {todaysMatchCardFun(LiveMatchesData, "true")}
              <SectionHeader
                title="LIVE TODAY"
                heading="MATCHES"
                viewMore="false"
              />
              {todaysMatchCardFun(LiveMatchesData, "false")}
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "100%" }}></div>
    </>
  );
};

export const NewsPage = () => {
  return (
    <>
      <PageHeaderImage
        image={Header}
        heading="heading text"
        title="Page title"
      />
      <div className="page_body">
        <div className="inner_page_body">
          <div className="section">
            <div className="card-group">
              {/* {rd?.map((e) => {
                return (
                  <Link
                    to={"/Post/" + e["Post Title"]}
                    key={e["Post Title"]}
                    className="a news_card"
                  >
                    <NewsCard
                      title={e["Post Title"]}
                      category={e.Category[0]}
                      image={e["Featured Media URL"]}
                    />
                  </Link>
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const GamesPage = () => {
  let database = useSelector((state) => state.apiData);

  return (
    <>
      <PageHeaderImage
        image={Header}
        heading="heading text"
        title="Page title"
      />
      <div className="page_body">
        <div className="inner_page_body">
          <div className="section">
            <div className="card-group">
              {games?.length
                ? games?.map((e) => (
                    <Link
                      key={e.name}
                      to={"/Tournaments/" + e.file}
                      className="game_card a"
                      style={{
                        background:
                          "url('./assets/img/" +
                          e.image +
                          "') center / cover no-repeat,rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <GameCard title={e.name} />
                    </Link>
                  ))
                : ""}
            </div>
          </div>
          <div className="section">
            <SectionHeader title="todays tournaments" heading="Tournaments" />
            <div className="card-group">
              {database.todaysTour?.length
                ? database.todaysTour?.map((e) => {
                    e.begin_at !== null
                      ? (e.begin_at = new Date(e.begin_at))
                      : (e.begin_at = null);
                    return tourCardFun(e, e.gamequery);
                  })
                : ""}
            </div>
          </div>
          <div className="section">
            <SectionHeader title="todays matches" heading="Matches" />
            <div className="card-group">
              {todaysMatchCardFun(database.todaysMatches, "true")}
              {todaysMatchCardFun(database.todaysMatches, "false")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TourPage = (props) => {
  let database = useSelector((state) => state.apiData);

  var data;
  props.match.params.name == "lol" ? (data = database.lol) : "";
  props.match.params.name == "rl" ? (data = database.rl) : "";
  props.match.params.name == "dota2" ? (data = database.dota2) : "";
  props.match.params.name == "ow" ? (data = database.ow) : "";
  props.match.params.name == "codmw" ? (data = database.codmw) : "";
  props.match.params.name == "r6siege" ? (data = database.r6siege) : "";
  props.match.params.name == "pubg_pc" ? (data = database.pubg_pc) : "";

  return (
    <>
      <PageHeaderImage
        image={Header}
        heading="heading text"
        title="Page title"
      />
      <div className="page_body">
        <div className="inner_page_body">
          <div className="section">
            <div className="card-group">
              {data?.length
                ? data?.map((e) => {
                    e.begin_at !== null
                      ? (e.begin_at = new Date(e.begin_at))
                      : (e.begin_at = null);
                    return tourCardFun(e, e.gamequery);
                  })
                : ""}
            </div>
          </div>
          <div className="section">
            <SectionHeader heading="Matches" title="Todays Matches" />
            <div className="card-group">
              {todaysMatchCardFun(database.todaysMatches, "true")}
              {todaysMatchCardFun(database.todaysMatches, "false")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TourDetailsPage = (props) => {
  let database = useSelector((state) => state.apiData);
  var data;
  props.match.params.game == "lol" ? (data = database.lol) : "";
  props.match.params.game == "rl" ? (data = database.rl) : "";
  props.match.params.game == "dota2" ? (data = database.dota2) : "";
  props.match.params.game == "ow" ? (data = database.ow) : "";
  props.match.params.game == "codmw" ? (data = database.codmw) : "";
  props.match.params.game == "r6siege" ? (data = database.r6siege) : "";
  props.match.params.game == "pubg" ? (data = database.pubg_pc) : "";
  console.log(props.match.params.game, data);
  return data
    ? data?.map((e) => {
        return e.id == props.match.params.id ? (
          <div key={e.id}>
            <PageHeaderImage image={Header} heading="Details" title={e.slug} />
            <div className="page_body">
              <div className="inner_page_body">
                <div className="section">
                  <TourHead title="TOURNAMENT INFO" />
                  <TourDetailsDiv1 title={e.slug} />
                  <TourDetailsDiv2
                    rightText="Begin At : "
                    leftText={String(new Date(e.begin_at))}
                  />
                  <TourDetailsDiv2
                    rightText="End At : "
                    leftText={String(new Date(e.end_at))}
                  />
                  <TourDetailsDiv2 rightText="League : " leftText={e.league} />
                  <TourDetailsDiv2
                    rightText="Live Support : "
                    leftText={e.live_supported}
                  />
                  {e.prizepool ? (
                    <TourDetailsDiv2
                      rightText="Prizepool : "
                      leftText={e.prizepool}
                    />
                  ) : (
                    ""
                  )}
                  <TourHead title="TOURNAMENT STATS" />
                  <div className="card-group">
                    <StatsCard image={image3} stat={e.winner} type="winner" />
                    <StatsCard
                      image={image4}
                      stat={e.videogame}
                      type="videogame"
                    />
                    <StatsCard
                      image={image2}
                      stat={e.matches?.length}
                      type="matches"
                    />
                    <StatsCard image={image1} stat={e.tier} type="tier" />
                  </div>
                  <TourHead title="TEAMS" />
                  <div className="card-group">
                    {e.teams?.map((p) => (
                      <TeamCard name={p.name} image={p.image_url} key={p.id} />
                    ))}
                  </div>
                  <TourHead title="MATCHES" />
                  <div className="card-group">
                    {GeneralMatchCardFun(e.matches, "true")}
                    {GeneralMatchCardFun(e.matches, "false")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          " "
        );
      })
    : "";
};

export const PostsPage = (props) => {
  let newsdata = props.location.postProps;

  return (
    <>
      <PageHeaderImage
        image={newsdata["Featured Media URL"]}
        heading="News Title"
        title={newsdata["Post Title"]}
      />
      <div className="page_body">
        <div className="inner_page_body">
          <div className="postDiv">
            <div className="postBody">
              {newsdata["Post Content"]?.map((e) => {
                if (e["Content type"] === "paragraph") {
                  return <p>{e["Post Data"]}</p>;
                } else if (e["Content type"] === "html") {
                  return (
                    <div dangerouslySetInnerHTML={{ __html: e["Post Data"] }} />
                  );
                }
              })}
            </div>
            <div className="rightColumn">
              <div className="header">
                <div className="inner">
                  <h1 className="title">NEWS</h1>
                  <h1 className="heading">RECENT</h1>
                </div>
              </div>
              <div className="card-group">
                {postData?.map((e) => {
                  return (
                    <Link
                      className="postCard a"
                      to={"/Post/" + e["Post Title"]}
                      key={e["Post Title"]}
                    >
                      <h4 className="title">{e["Post Title"]}</h4>
                      <p className="category">{e.Category[0]}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const SearchPage = (props) => {
  let database = useSelector((state) => state.apiData);

  return (
    <>
      {/* {setTour(false)} */}
      <div className="page_body">
        <div className="inner_page_body">
          <div className="section">
            <SectionHeader title="todays tournaments" heading="Tournaments" />
            <div className="card-group">
              <SearchTournaments
                data={database.lol}
                searchValue={props.match.params.value}
              />
              {console.log(tour)}
              <SearchTournaments
                data={database.rl}
                searchValue={props.match.params.value}
              />
              <SearchTournaments
                data={database.codmw}
                searchValue={props.match.params.value}
              />
              <SearchTournaments
                data={database.ow}
                searchValue={props.match.params.value}
              />
              <SearchTournaments
                data={database.pubg_pc}
                searchValue={props.match.params.value}
              />
              <SearchTournaments
                data={database.r6siege}
                searchValue={props.match.params.value}
              />
              <SearchTournaments
                data={database.dota2}
                searchValue={props.match.params.value}
              />
            </div>
          </div>

          <div className="section">
            <SectionHeader title="todays matches" heading="Matches" />
            <div className="card-group">
              {searchTodaysMatchCard(
                database.todaysMatches,
                "true",
                props.match.params.value
              )}
              {searchTodaysMatchCard(
                database.todaysMatches,
                "false",
                props.match.params.value
              )}
            </div>
          </div>
          <div className="section">
            <SectionHeader title="Latest" heading="News" />
            <div className="card-group">
              {NewsData?.map((e) => {
                return e["Post Title"]
                  .toLowerCase()
                  .includes(props.match.params.value) ||
                  e.Category[0]
                    .toLowerCase()
                    .includes(props.match.params.value) ? (
                  <Link
                    to={"/Post/" + e["Post Title"]}
                    key={e.id}
                    className="a news_card"
                  >
                    <NewsCard
                      title={e["Post Title"]}
                      category={e.Category[0]}
                      image={e["Featured Media URL"]}
                    />
                  </Link>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
