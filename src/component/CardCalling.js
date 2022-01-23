/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import { MatchCard, TourCard } from "./Cards";
import { Link } from "react-router-dom";
const date = new Date();

export const matchCardFun = (e, liveNow, key) => {
  return (
    <MatchCard
      key={key}
      team1={e.team1_logo}
      team2={e.team2_logo}
      tname={e.tournament_name}
      beginAt={"Begin at : " + e.begin_at}
      mname={e.name}
      endAt={"End at : " + e.end_at}
      wname={e.winner}
      liveUrl={e.live_url !== null ? e.live_url : null}
      liveType={e.live_url_type}
      liveNow={liveNow}
    />
  );
};

export const tourCardFun = (e, game) => {
  return (
    <Link
      key={e.id}
      className="tour_card"
      to={"/details/" + game + "/" + e.id}
      style={{ textDecoration: "none" }}
    >
      <TourCard
        image={e.image_url}
        title={e.slug}
        beginAt={String(e.begin_at)}
      />
    </Link>
  );
};

export const todaysMatchCardFun = (data, liveNow) => {
  return data?.map((e) => {
    e.begin_at !== null ? (e.begin_at = new Date(e.begin_at)) : null;
    e.end_at !== null ? (e.end_at = new Date(e.end_at)) : null;
    return liveNow == "true"
      ? e.begin_at !== null &&
        String(e.begin_at).substring(0, 15) === String(date).substring(0, 15)
        ? e.end_at === null && e.begin_at.getTime() <= date.getTime()
          ? matchCardFun(e, liveNow, e.slug)
          : e.end_at !== null &&
            e.begin_at.getTime() <= date.getTime() &&
            e.end_at.getTime() >= date.getTime()
          ? matchCardFun(e, liveNow, e.slug)
          : ""
        : ""
      : e.begin_at !== null &&
        String(e.begin_at).substring(0, 15) === String(date).substring(0, 15)
      ? e.end_at === null && e.begin_at.getTime() > date.getTime()
        ? matchCardFun(e, liveNow, e.slug)
        : e.end_at !== null &&
          (e.begin_at.getTime() > date.getTime() ||
            e.end_at.getTime() < date.getTime())
        ? matchCardFun(e, liveNow, e.slug)
        : ""
      : "";
  });
};
export const GeneralMatchCardFun = (data, liveNow) => {
  return data?.map((e) => {
    e.begin_at !== null ? (e.begin_at = new Date(e.begin_at)) : null;
    e.end_at !== null ? (e.end_at = new Date(e.end_at)) : null;
    return liveNow == "true"
      ? e.begin_at !== null
        ? e.end_at === null && e.begin_at.getTime() <= date.getTime()
          ? matchCardFun(e, liveNow, e.slug)
          : e.end_at !== null &&
            e.begin_at.getTime() <= date.getTime() &&
            e.end_at.getTime() >= date.getTime()
          ? matchCardFun(e, liveNow, e.slug)
          : ""
        : ""
      : e.begin_at !== null
      ? e.end_at === null && !(e.begin_at.getTime() <= date.getTime())
        ? matchCardFun(e, liveNow, e.slug)
        : e.end_at !== null &&
          !(
            e.begin_at.getTime() <= date.getTime() &&
            e.end_at.getTime() >= date.getTime()
          )
        ? matchCardFun(e, liveNow, e.slug)
        : ""
      : matchCardFun(e, liveNow, e.slug);
  });
};
