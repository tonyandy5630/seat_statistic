import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

interface GridProps {
  children: React.ReactNode;
}

export default function MyGrid({ children }: GridProps) {
  return (
    <Grid sm={6} md={12}>
      {children}
    </Grid>
  );
}
