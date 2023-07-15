import http from "@/utils/http";

import { TimeResponse } from "@/types/time.type";
import { LATEST_RECORD_TIME_URL } from "@/constant/api.const";

export const getLatestRecordTimeAPI = () =>
  http.get<TimeResponse>(LATEST_RECORD_TIME_URL);
