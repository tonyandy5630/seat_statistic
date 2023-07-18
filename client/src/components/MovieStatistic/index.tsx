import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Tabs, Tab, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import RatioTab from "../SeatRatioTabs";
import PieCharRegion from "../PieCharRegion";
import { MOVIE_TAB } from "@/constant/index.const";
import {
  getCinemaPerMovieAPI,
  getMoviePerCinemaAPI,
  getMoviePerRegionAPI,
  getRegionPerMovieAPI,
} from "@/apis/ratio.api";
import { RegionPercentType } from "@/types/ratio-layout.type";

export default function MovieStatistic() {
  const [typeOfRatio, setTypeOfRatio] = useState<RegionPercentType>(
    MOVIE_TAB.cinema
  );
  const { data: cinemaData, status: cinemaStatus } = useQuery(
    ["cinema-per-movie-query"],
    getCinemaPerMovieAPI,
    {
      enabled: typeOfRatio === MOVIE_TAB.cinema,
    }
  );

  const { data: regionData, status: regionStatus } = useQuery(
    ["region-per-movie-query"],
    getRegionPerMovieAPI,
    {
      enabled: typeOfRatio === MOVIE_TAB.region,
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
            <Tab label='Cinemas' value={MOVIE_TAB.cinema} />
            <Tab label='Regions' value={MOVIE_TAB.region} />
          </Tabs>
        </Stack>
      </Grid>
      <RatioTab value={typeOfRatio} keyId={MOVIE_TAB.cinema}>
        <PieCharRegion data={cinemaData} status={cinemaStatus} />
      </RatioTab>
      <RatioTab value={typeOfRatio} keyId={MOVIE_TAB.region}>
        <PieCharRegion data={regionData} status={regionStatus} />
      </RatioTab>
    </>
  );
}
