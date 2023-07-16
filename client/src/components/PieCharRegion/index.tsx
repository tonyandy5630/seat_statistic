import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Cell } from "recharts";
const Typography = dynamic(() => import("@mui/material/Typography"));
const PieChartComp = dynamic(() => import("../PieChart"));
import { RatioDataType, RatioPerTabTypeResponse } from "@/types/ratio.type";
import { getPieCellColor } from "@/utils/piechart";
import formatData from "@/utils/formatData";
import { AxiosResponse } from "axios";
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress")
);

interface PieRegion {
  status: any;
  data: // | RatioDataType[]
  undefined | AxiosResponse<RatioPerTabTypeResponse, any>;
}

function PieChartRegion({ status, data }: PieRegion) {
  const [stat, setStat] = useState<RatioDataType[] | undefined>();

  useEffect(() => {
    if (status === "success" && data !== undefined) {
      const allRegionData = data?.data.data;
      if (allRegionData !== undefined) {
        const fRegiondata: RatioDataType[] = formatData(allRegionData);
        setStat(fRegiondata);
      }
    }
  }, [status]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "success") {
    return stat === undefined ? (
      <Typography>EMPTY STATS</Typography>
    ) : (
      stat.map(({ tabName, data: regData }) => {
        return (
          <PieChartComp
            key={tabName}
            regionName={tabName}
            data={regData}
            md={12}
          >
            {regData.map((val, index) => (
              <Cell key={`cell-${index}`} fill={getPieCellColor(index)} />
            ))}
          </PieChartComp>
        );
      })
    );
  }

  if ((status = "error")) {
    return <Typography>ERROR</Typography>;
  }
}

export default memo(PieChartRegion);
