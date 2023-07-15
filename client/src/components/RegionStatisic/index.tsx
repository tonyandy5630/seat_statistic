import dynamic from "next/dynamic";
import useRatio from "@/hooks/useRatio";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
const Typography = dynamic(() => import("@mui/material/Typography"));
import { getEachRegionAPI, getRegionPerMovie } from "@/apis/ratio.api";
import { useQuery } from "@tanstack/react-query";
import { REGION_TAB } from "@/constant/index.const";
const Grid = dynamic(() => import("@mui/material/Unstable_Grid2")); // Grid version 2
import {
  PercentValue,
  PieChartRatio,
  RegionPerMoviePercentValue,
  RegionPercentValue,
} from "@/types/ratio.type";
import { Tab, Tabs } from "@mui/material";
import { RegionPercentType } from "@/types/ratio-layout.type";
import RatioTab from "../SeatRatioTabs";
const PieChartRegion = dynamic(() => import("../PieCharRegion"));

export interface RatioDataType {
  regionName: string;
  data: PieChartRatio[];
}

function RegionStatistic() {
  const [regions, setRegions] = useState();
  const [typeOfRatio, setTypeOfRatio] = useState<RegionPercentType>(
    REGION_TAB.cinema
  );
  const [allRegionStats, setAllRegionStats] = useState<
    | {
        cinema?: RatioDataType[];
        movie?: RatioDataType[];
      }
    | undefined
  >({
    cinema: undefined,
    movie: undefined,
  });

  // const { data, status, error } = useRatio("region", "region-querykey");
  const { data: regionData, status: regionStatus } = useQuery(
    ["each-region-stats"],
    getEachRegionAPI,
    {
      staleTime: 30000,
      enabled: typeOfRatio === REGION_TAB.cinema,
    }
  );

  const { data: regionPerMovieData, status: regionPerMovieStatus } = useQuery(
    ["region-per-movie-status"],
    getRegionPerMovie,
    {
      staleTime: 30000,
      enabled: typeOfRatio === REGION_TAB.movies,
    }
  );

  const handleChangeTypeOfRatio = (
    e: React.SyntheticEvent,
    newValue: RegionPercentType
  ) => {
    setTypeOfRatio(newValue);
  };

  /**
   * this function format arrays of original region data to pie ratio data that can use for viewing in pie chart
   * @param arr : array of original data
   * @returns pie char ratio data type
   */

  function formatRegionData(
    arr: RegionPercentValue[] | RegionPerMoviePercentValue[]
  ): RatioDataType[] {
    return arr.map(({ id, name, value }) => {
      const formatData: PieChartRatio[] = formatRatioRegionData(value, id);
      return {
        regionName: name,
        data: formatData,
      };
    });
  }

  function formatRatioRegionData(
    arr: PercentValue[] | PercentValue[],
    id: number
  ): PieChartRatio[] {
    return arr.map((val) => {
      const value = parseFloat(parseFloat(val.percentage).toFixed(1));

      return { name: val.name, value };
    });
  }

  useEffect(() => {
    if (regionStatus === "success" && regionData !== undefined) {
      if (typeOfRatio === REGION_TAB.cinema) {
        const allRegionData = regionData?.data.data;
        if (allRegionData !== undefined) {
          const fRegiondata: RatioDataType[] = formatRegionData(allRegionData);
          setAllRegionStats({ cinema: fRegiondata });
        }
      }
    }
    if (
      regionPerMovieStatus === "success" &&
      regionPerMovieData !== undefined
    ) {
      if (typeOfRatio === REGION_TAB.movies) {
        const allRegionData = regionPerMovieData?.data.data;
        if (allRegionData !== undefined) {
          const fRegiondata: RatioDataType[] = formatRegionData(allRegionData);
          setAllRegionStats({ movie: fRegiondata });
        }
      }
    }
  }, [regionStatus, regionPerMovieStatus, typeOfRatio]);

  return (
    <>
      <Grid xs={12} className='min-w-full my-3'>
        <Stack className='flex items-center justify-center '>
          <Typography>Percent of</Typography>
          <Tabs
            aria-label='all type ratio tabs '
            value={typeOfRatio}
            onChange={handleChangeTypeOfRatio}
          >
            <Tab label='Cinemas' value={REGION_TAB.cinema} />
            <Tab label='Movies' value={REGION_TAB.movies} />
          </Tabs>
        </Stack>
      </Grid>
      <RatioTab value={typeOfRatio} keyId={REGION_TAB.cinema}>
        <PieChartRegion status={regionStatus} data={allRegionStats?.cinema} />
      </RatioTab>
      <RatioTab value={typeOfRatio} keyId={REGION_TAB.movies}>
        <PieChartRegion
          status={regionPerMovieStatus}
          data={allRegionStats?.movie}
        />
      </RatioTab>
    </>
  );
}

export default RegionStatistic;
