import { ResponseAPI } from "./utils.type";

export type RatioResponse = ResponseAPI<{
  data: Array<Object>;
}>;

export type RatioPerTabTypeResponse = ResponseAPI<PercentPerValue[]>;

export type PieChartRatio = {
  name: string | number;
  value: number;
  label?: string;
};

export type PercentPerValue = {
  id: number;
  name: string;
  value: PercentValue[];
};

export type PercentValue = {
  name: string;
  percentage: string;
};

export interface RatioDataType {
  tabName: string;
  data: PieChartRatio[];
}
