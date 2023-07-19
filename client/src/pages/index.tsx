import React from "react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Stack,
  Typography,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Box,
  useTheme,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Unstable_Grid2";
import RatioTab from "@/components/SeatRatioTabs";
const RegionStatistic = dynamic(() => import("@/components/RegionStatisic"));
import { TAB, CINEMA } from "@/constant/index.const";
import { RatioType } from "@/types/ratio-layout.type";
import { useQuery } from "@tanstack/react-query";
import { getLatestRecordTimeAPI } from "@/apis/time.api";
import dayjs from "dayjs";
const MovieStatistic = dynamic(() => import("@/components/MovieStatistic"));
const CinemaStatistic = dynamic(() => import("@/components/CinemaStatistic"));

export default function MainPage() {
  const theme = useTheme();
  const [cinema, setCinema] = useState(CINEMA.lotte);
  const [value, setValue] = useState<RatioType>(TAB.region);
  const [recordTime, setRecordTime] = useState<string | undefined>("");
  const { data, status } = useQuery(
    ["latest-record-query"],
    getLatestRecordTimeAPI
  );

  function handleChangeCinema(e: SelectChangeEvent) {
    setCinema((prev) => e.target.value);
  }

  function handleTabChange(event: React.SyntheticEvent, newValue: RatioType) {
    setValue(newValue);
  }

  useEffect(() => {
    if (status === "success") {
      if (data?.data.data?.latestRecordTime === undefined) {
        return;
      }
      const time = data?.data.data?.latestRecordTime;
      const formatTime = dayjs(time).format("HH:mm DD/MM/YYYY");
      setRecordTime(formatTime.toString());
    }
  }, [status]);

  return (
    <Box
      component={Container}
      className='min-h-screen'
      sx={{ width: "fit-content !important" }}
    >
      <Grid
        container
        justifyContent='center'
        sx={{
          minHeight: "100%",
          p: {
            md: 2,
          },
        }}
      >
        <Grid sm={6} md={12}>
          <Stack alignItems='center'>
            <Stack alignItems='center' justifyContent='center' className='mt-3'>
              <Typography
                variant='h3'
                textTransform='capitalize'
                fontWeight='bold'
                textAlign='center'
                className='text-3xl md:text-5xl'
              >
                Fill Ratio of cinemas
              </Typography>
              <Stack
                id='current-cinema'
                direction='row'
                alignItems='center'
                justifyContent='center'
                sx={{ height: 80 }}
              >
                <Typography className='mr-1'>Current cinema:</Typography>
                <Select
                  defaultValue='lotte'
                  sx={{ height: "40px" }}
                  onChange={handleChangeCinema}
                >
                  <MenuItem value={CINEMA.lotte}>Lotte Cinema</MenuItem>
                  {/* <MenuItem value={CINEMA.cgv}>CGV Cinema</MenuItem> */}
                </Select>
              </Stack>
            </Stack>
            <Stack
              className='min-w-full '
              alignItems='end'
              justifyContent='center'
            >
              <Typography>
                {`Last collected at: `}
                <span className='font-bold'>{recordTime}</span>
              </Typography>
            </Stack>
            <Box
              sx={{
                width: "100%",
                bgcolor: "rgba(48, 30, 103,0.5)",
                p: 1,
                borderRadius: "1px",
                // border: "1px solid #ffffff36",
              }}
            >
              <Stack className='h-full min-w-full' alignItems='center'>
                <Tabs
                  aria-label='all type ratio tabs '
                  value={value}
                  onChange={handleTabChange}
                  sx={{
                    "& .MuiTabs-indicator": {
                      display: "none",
                    },
                  }}
                >
                  <Tab value={TAB.region} label='Regions' />
                  <Tab value={TAB.cinema} label='Cinemas' />
                  <Tab value={TAB.movie} label='Movies' />
                </Tabs>
              </Stack>
            </Box>
            <RatioTab value={value} keyId={TAB.region}>
              <RegionStatistic />
            </RatioTab>
            <RatioTab value={value} keyId={TAB.cinema}>
              <CinemaStatistic />
            </RatioTab>
            <RatioTab value={value} keyId={TAB.movie}>
              <MovieStatistic />
            </RatioTab>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
