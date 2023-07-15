import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

interface RatioTab {
  value: string;
  keyId: string;
  children?: React.ReactNode;
}

export default function RatioTab({ value, keyId, children }: RatioTab) {
  return (
    <Grid
      container
      className='min-w-full'
      justifyContent='center'
      alignItems='center'
    >
      {value === keyId && children}
    </Grid>
  );
}
