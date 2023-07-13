import React from "react";
import "@/styles/global.css";
import { useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Select,
  MenuItem,
  TextField,
  Tabs,
  Tab,
  Box,
  useTheme,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Unstable_Grid2";
import RatioTab from "@/components/SeatRatioTabs";
import RegionStatistic from "@/components/RegionStatisic";
import { TAB, CINEMA } from "@/constant";

export default function MainPage() {
  const theme = useTheme();
  const [cinema, setCinema] = useState(CINEMA.lotte);
  const [value, setValue] = useState(TAB.region);

  function handleChangeCinema(e: SelectChangeEvent) {
    setCinema((prev) => e.target.value);
  }

  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setValue(newValue);
  }

  return (
    <>
      <Container maxWidth='lg' className='min-h-screen'>
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
          <Grid sm={12} md={9}>
            <Stack alignItems='center'>
              <Stack
                alignItems='center'
                justifyContent='center'
                className='mt-3'
              >
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
                    <MenuItem value={CINEMA.cgv}>CGV Cinema</MenuItem>
                  </Select>
                </Stack>
              </Stack>
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "rgba(48, 30, 103,0.5)",
                  p: 1,
                  borderRadius: "10px",
                  // border: "1px solid #ffffff36",
                }}
              >
                <Stack className='h-full min-w-full' alignItems='center'>
                  <Tabs
                    aria-label='secondary tabs example'
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
                    <Tab value={TAB.film} label='Films' />
                  </Tabs>
                  {/* <TextField
                    className='w-full h-1/2 md:w-1/2'
                    size='small'
                    placeholder='Search cinema, film, region...'
                    sx={{
                      "&.MuiTextField-root": {
                        borderRadius: "inherit",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      sx: {
                        "& input::placeholder": {
                          fontSize: "13px",
                        },
                      },
                    }}
                  /> */}
                </Stack>
                <RatioTab value={value} keyId={TAB.region}>
                  <RegionStatistic />
                </RatioTab>
                <RatioTab value={value} keyId={TAB.cinema}></RatioTab>
                <RatioTab value={value} keyId={TAB.film}></RatioTab>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
