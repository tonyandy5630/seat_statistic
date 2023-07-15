import { RatioType, RegionPercentType } from "@/types/ratio-layout.type";

const TAB: {
  region: RatioType;
  cinema: RatioType;
  film: RatioType;
} = {
  region: "region",
  cinema: "cinema",
  film: "film",
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
