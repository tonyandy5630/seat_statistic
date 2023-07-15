import { ResponseAPI } from "./utils.type";

export type RatioResponse = ResponseAPI<{
  data: Array<Object>;
}>;

export type EachRegionResponse = ResponseAPI<RegionPercentValue[]>;

export type RatioPerMovieResponse = ResponseAPI<RegionPerMoviePercentValue[]>;

export type PieChartRatio = {
  name: string | number;
  value: number;
  label?: string;
};

export type RegionPercentValue = {
  id: number;
  name: string;
  value: PercentValue[];
};

export type PercentValue = {
  name: string;
  percentage: string;
};

export type RegionPerMoviePercentValue = {
  name: string;
  id: number;
  value: PercentValue[];
};
