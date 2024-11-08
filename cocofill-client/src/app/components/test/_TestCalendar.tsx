"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material";
import { testMonthData } from "../../data/test-calendar-data";

const TestCalendar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        {testMonthData.map((data, index) => (
          <Grid key={index} size={12 / 7} borderRight={1} borderBottom={1}>
            {data}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const TestCalendarGrid = styled(Grid)(({ theme }) => ({
  border: "1px solid #000",
}));

export default TestCalendar;
