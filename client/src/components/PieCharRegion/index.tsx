import React, { memo } from "react";
import dynamic from "next/dynamic";
import { Cell } from "recharts";
const Typography = dynamic(() => import("@mui/material/Typography"));
const PieChartComp = dynamic(() => import("../PieChart"));
import { RatioDataType } from "../RegionStatisic";
import { getPieCellColor } from "@/utils/piechart";
const CircularProgress = dynamic(
  () => import("@mui/material/CircularProgress")
);

interface PieRegion {
  status: any;
  data: RatioDataType[] | undefined;
}

function PieChartRegion({ status, data }: PieRegion) {
  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "success") {
    return data === undefined ? (
      <Typography>EMPTY STATS</Typography>
    ) : (
      data.map(({ regionName, data: regData }) => {
        return (
          <PieChartComp
            key={regionName}
            regionName={regionName}
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
