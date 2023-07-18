import { RatioType, RegionPercentType } from "@/types/ratio-layout.type";

const TAB: {
  region: RatioType;
  cinema: RatioType;
  movie: RatioType;
} = {
  region: "region",
  cinema: "cinema",
  movie: "movie",
};

const REGION_TAB: {
  cinema: RegionPercentType;
  movies: RegionPercentType;
} = {
  cinema: "cinema",
  movies: "movies",
};

const MOVIE_TAB: {
  cinema: RegionPercentType;
  region: RegionPercentType;
} = {
  cinema: "cinema",
  region: "region",
};

const CINEMA = {
  lotte: "lotte",
  cgv: "cgv",
};

export { TAB, CINEMA, REGION_TAB, MOVIE_TAB };
