import Grid2 from "@mui/material/Unstable_Grid2";
import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { Box, Typography } from "@mui/material";
import { PieChartRatio } from "@/types/ratio.type";
import "@/styles/piechart.css";
interface PieChartProps {
  regionName: string;
  data: PieChartRatio[];
  children: any;
  md: number;
}

export default function PieChartComp({
  regionName,
  children,
  data,
  md = 6,
}: PieChartProps) {
  return (
    <Grid2
      key={regionName}
      flexWrap='wrap'
      className='flex flex-col items-center justify-center mt-3 bg-gray-700 h-fit'
      spacing={2}
      sm={12}
      md={md}
    >
      //* test ci/cd
      <Box
        sx={{ width: "100%" }}
        className='flex flex-col items-center justify-center'
      >
        <PieChart
          width={500}
          height={350}
          key={regionName}
          margin={{ left: 40, bottom: 40 }}
        >
          <Pie
            dataKey='value'
            isAnimationActive={true}
            data={data}
            animationBegin={200}
            cx={200}
            cy={200}
            outerRadius={80}
            label
          >
            {children}
          </Pie>
          <Tooltip />
          <Legend height={36} layout='vertical' />
        </PieChart>
        <Typography fontWeight='bold'>{regionName}</Typography>
      </Box>
    </Grid2>
  );
}
