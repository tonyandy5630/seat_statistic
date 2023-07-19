import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Cell } from "recharts";
const Typography = dynamic(() => import("@mui/material/Typography"));
const PieChartComp = dynamic(() => import("../PieChart"));
import { RatioDataType, RatioPerTabTypeResponse } from "@/types/ratio.type";
import { getPieCellColor } from "@/utils/piechart";
import formatData from "@/utils/formatData";
import { Box } from "@mui/material";
import { AxiosResponse } from "axios";
import CircularProgress from "@mui/material/CircularProgress";
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
            legendContent={
              <ul className='flex flex-col items-start  h-full max-h-[374px] overflow-auto overflow-x-hidden list-disc'>
                {regData
                  .sort((a, b) => {
                    if (a.value > b.value) return -1;
                    if (a.value < b.value) return 1;
                    return 0;
                  })
                  .map((val, index) => {
                    return (
                      <li
                        key={`item-${index}`}
                        style={{
                          color: `${getPieCellColor(index)}`,
                          textAlign: "start",
                        }}
                        className='flex items-baseline justify-center'
                      >
                        <Box sx={{ mr: "4px" }}>
                          <svg width='15' height='15' className='inline '>
                            <rect
                              width='15'
                              height='15'
                              style={{
                                fill: `${getPieCellColor(index)}`,
                              }}
                            />
                          </svg>
                        </Box>
                        <Typography className='ml-2'>
                          <span>{`${val.name}: `}</span>
                          <span
                            style={{ fontWeight: "bold" }}
                          >{`${val.value}%`}</span>
                        </Typography>
                      </li>
                    );
                  })}
              </ul>
            }
          >
            {regData
              .sort((a, b) => {
                if (a.value > b.value) return -1;
                if (a.value < b.value) return 1;
                return 0;
              })
              .map((val, index) => (
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
