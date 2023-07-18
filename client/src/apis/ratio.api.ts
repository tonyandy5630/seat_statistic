import http from "@/utils/http";
import { RatioPerTabTypeResponse, RatioResponse } from "@/types/ratio.type";
import {
  REGION_URL,
  EACH_REGION_URL,
  REGION_PER_MOVIE_URL,
  MOVIE_PER_CINEMA_URL,
  CINEMA_PER_MOVIE_URL,
  MOVIE_PER_REGION_URL,
} from "@/constant/api.const";

export const getRegionAPI = () => http.get<RatioResponse>(REGION_URL);

export const getEachRegionAPI = () =>
  http.get<RatioPerTabTypeResponse>(EACH_REGION_URL);

export const getMoviePerRegionAPI = () =>
  http.get<RatioPerTabTypeResponse>(REGION_PER_MOVIE_URL);

export const getMoviePerCinemaAPI = () =>
  http.get<RatioPerTabTypeResponse>(MOVIE_PER_CINEMA_URL);

export const getCinemaPerMovieAPI = () =>
  http.get<RatioPerTabTypeResponse>(CINEMA_PER_MOVIE_URL);

export const getRegionPerMovieAPI = () =>
  http.get<RatioPerTabTypeResponse>(MOVIE_PER_REGION_URL);
