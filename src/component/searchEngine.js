/* eslint-disable no-unused-expressions */
import React from "react";
import { tourCardFun, matchCardFun } from "./CardCalling";
const date = new Date();
export var tour = false;
export var match = false;
export var news = false;

export const SearchTournaments = (props) => {
  props.data?.map((e) =>
    e.slug.toLowerCase().includes(props.searchValue) ||
    e.videogame.toLowerCase().includes(props.searchValue)
      ? (tour = true)
      : ""
  );
  return props.data?.map((e) =>
    e.slug.toLowerCase().includes(props.searchValue) ||
    e.videogame.toLowerCase().includes(props.searchValue)
      ? tourCardFun(e, e.gamequery)
      : ""
  );
};

export const setTour = (value) => {
  tour = value;
};

export const searchTodaysMatchCard = (data, liveNow, searchValue) => {
  return data?.map((e) => {
    e.begin_at !== null ? (e.begin_at = new Date(e.begin_at)) : null;
    e.end_at !== null ? (e.end_at = new Date(e.end_at)) : null;
    return liveNow == "true"
      ? e.begin_at !== null &&
        String(e.begin_at).substring(0, 15) === String(date).substring(0, 15)
        ? e.end_at === null && e.begin_at.getTime() <= date.getTime()
          ? e.slug.toLowerCase().includes(searchValue) ||
            e.name.toLowerCase().includes(searchValue) ||
            e.tournament_name.toLowerCase().includes(searchValue) ||
            e.videogame.toLowerCase().includes(searchValue)
            ? matchCardFun(e, liveNow, e.slug)
            : ""
          : e.end_at !== null &&
            e.begin_at.getTime() <= date.getTime() &&
            e.end_at.getTime() >= date.getTime()
          ? e.slug.toLowerCase().includes(searchValue) ||
            e.name.toLowerCase().includes(searchValue) ||
            e.tournament_name.toLowerCase().includes(searchValue) ||
            e.videogame.toLowerCase().includes(searchValue)
            ? matchCardFun(e, liveNow, e.slug)
            : ""
          : ""
        : ""
      : e.begin_at !== null &&
        String(e.begin_at).substring(0, 15) === String(date).substring(0, 15)
      ? e.end_at === null && e.begin_at.getTime() > date.getTime()
        ? e.slug.toLowerCase().includes(searchValue) ||
          e.name.toLowerCase().includes(searchValue) ||
          e.tournament_name.toLowerCase().includes(searchValue) ||
          e.videogame.toLowerCase().includes(searchValue)
          ? matchCardFun(e, liveNow, e.slug)
          : ""
        : e.end_at !== null &&
          (e.begin_at.getTime() > date.getTime() ||
            e.end_at.getTime() < date.getTime())
        ? e.slug.toLowerCase().includes(searchValue) ||
          e.name.toLowerCase().includes(searchValue) ||
          e.tournament_name.toLowerCase().includes(searchValue) ||
          e.videogame.toLowerCase().includes(searchValue)
          ? matchCardFun(e, liveNow, e.slug)
          : ""
        : ""
      : "";
  });
};
