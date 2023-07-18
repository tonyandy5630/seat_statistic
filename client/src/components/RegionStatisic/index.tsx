import dynamic from "next/dynamic";
import useRatio from "@/hooks/useRatio";
import React, { useState } from "react";
import { Stack } from "@mui/material";
const Typography = dynamic(() => import("@mui/material/Typography"));
import { getEachRegionAPI, getMoviePerRegionAPI } from "@/apis/ratio.api";
import { useQuery } from "@tanstack/react-query";
import { REGION_TAB } from "@/constant/index.const";
const Grid = dynamic(() => import("@mui/material/Unstable_Grid2")); // Grid version 2
import { Tab, Tabs } from "@mui/material";
import { RegionPercentType } from "@/types/ratio-layout.type";
import RatioTab from "../SeatRatioTabs";
const PieChartRegion = dynamic(() => import("../PieCharRegion"), {
  loading: () => <p>Loading</p>,
});

function RegionStatistic() {
  const [regions, setRegions] = useState();
  const [typeOfRatio, setTypeOfRatio] = useState<RegionPercentType>(
    REGION_TAB.cinema
  );

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
    getMoviePerRegionAPI,
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
        <PieChartRegion status={regionStatus} data={regionData} />
      </RatioTab>
      <RatioTab value={typeOfRatio} keyId={REGION_TAB.movies}>
        <PieChartRegion
          status={regionPerMovieStatus}
          data={regionPerMovieData}
        />
      </RatioTab>
    </>
  );
}

export default RegionStatistic;
