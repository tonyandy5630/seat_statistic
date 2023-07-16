import { getCinemaPerMovieAPI } from "@/apis/ratio.api";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React from "react";
import RatioTab from "../SeatRatioTabs";
import PieCharRegion from "../PieCharRegion";
const Grid = dynamic(() => import("@mui/material/Unstable_Grid2")); // Grid version 2

export default function CinemaStatistic() {
  const { data, status } = useQuery(
    ["cinema-per-movie-query"],
    getCinemaPerMovieAPI
  );

  return (
    <Grid xs={12} className='min-w-full my-3'>
      <RatioTab>
        <PieCharRegion data={data} status={status} />
      </RatioTab>
    </Grid>
  );
}
