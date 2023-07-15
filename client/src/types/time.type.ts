import { ResponseAPI } from "./utils.type";

export type TimeResponse = ResponseAPI<TimeType>;

export type TimeType = {
  latestRecordTime: string;
};
