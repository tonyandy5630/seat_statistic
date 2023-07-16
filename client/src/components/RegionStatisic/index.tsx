import dynamic from "next/dynamic";
import useRatio from "@/hooks/useRatio";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
const Typography = dynamic(() => import("@mui/material/Typography"));
import { getEachRegionAPI, getRegionPerMovieAPI } from "@/apis/ratio.api";
import { useQuery } from "@tanstack/react-query";
import { REGION_TAB } from "@/constant/index.const";
const Grid = dynamic(() => import("@mui/material/Unstable_Grid2")); // Grid version 2
import { PieChartRatio, RatioDataType } from "@/types/ratio.type";
import { Tab, Tabs } from "@mui/material";
import { RegionPercentType } from "@/types/ratio-layout.type";
import RatioTab from "../SeatRatioTabs";
import formatData from "@/utils/formatData";
import CircularProgress from "@mui/material/CircularProgress";
const PieChartRegion = dynamic(() => import("../PieCharRegion"), {
  loading: () => <p>Loading</p>,
});

function RegionStatistic() {
  const [regions, setRegions] = useState();
  const [typeOfRatio, setTypeOfRatio] = useState<RegionPercentType>(
    REGION_TAB.cinema
  );

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
    getRegionPerMovieAPI,
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

  // useEffect(() => {
  //   if (regionStatus === "success" && regionData !== undefined) {
  //     if (typeOfRatio === REGION_TAB.cinema) {
  //       const allRegionData = regionData?.data.data;
  //       if (allRegionData !== undefined) {
  //         const fRegiondata: RatioDataType[] = formatData(allRegionData);
  //         setAllRegionStats({ cinema: fRegiondata });
  //       }
  //     }
  //   }

  //   if (
  //     regionPerMovieStatus === "success" &&
  //     regionPerMovieData !== undefined
  //   ) {
  //     if (typeOfRatio === REGION_TAB.movies) {
  //       const allRegionData = regionPerMovieData?.data.data;
  //       if (allRegionData !== undefined) {
  //         const fRegiondata: RatioDataType[] = formatData(allRegionData);
  //         setAllRegionStats({ movie: fRegiondata });
  //       }
  //     }
  //   }
  // }, [regionStatus, regionPerMovieStatus, typeOfRatio]);

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
