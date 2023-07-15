import http from "@/utils/http";
import {
  EachRegionResponse,
  RatioPerMovieResponse,
  RatioResponse,
} from "@/types/ratio.type";
import {
  REGION_URL,
  EACH_REGION_URL,
  REGION_PER_MOVIE_URL,
} from "@/constant/api.const";

export const getRegionAPI = () => http.get<RatioResponse>(REGION_URL);

export const getEachRegionAPI = () =>
  http.get<EachRegionResponse>(EACH_REGION_URL);

export const getRegionPerMovie = () =>
  http.get<RatioPerMovieResponse>(REGION_PER_MOVIE_URL);
