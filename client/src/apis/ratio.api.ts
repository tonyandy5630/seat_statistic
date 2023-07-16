import http from "@/utils/http";
import { RatioPerTabTypeResponse, RatioResponse } from "@/types/ratio.type";
import {
  REGION_URL,
  EACH_REGION_URL,
  REGION_PER_MOVIE_URL,
  CINEMA_PER_MOVIE_URL,
} from "@/constant/api.const";

export const getRegionAPI = () => http.get<RatioResponse>(REGION_URL);

export const getEachRegionAPI = () =>
  http.get<RatioPerTabTypeResponse>(EACH_REGION_URL);

export const getRegionPerMovieAPI = () =>
  http.get<RatioPerTabTypeResponse>(REGION_PER_MOVIE_URL);

export const getCinemaPerMovieAPI = () =>
  http.get<RatioPerTabTypeResponse>(CINEMA_PER_MOVIE_URL);
