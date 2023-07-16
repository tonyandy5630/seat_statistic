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

const CINEMA = {
  lotte: "lotte",
  cgv: "cgv",
};

export { TAB, CINEMA, REGION_TAB };
