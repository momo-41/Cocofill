import React from "react";
// import InputEmployeeView from "./components/InputEmployeeView";
// import TestCalendarWeek from "./components/test/TestCalendarWeek";
import TestTableMUI from "./components/test/TestTableMUI";
import { Box } from "@mui/material";
// import TestCalendar from "./components/test/_TestCalendar";
// import TestDayjs from "./components/test/_TestDayjs";

const Page = () => {
  return (
    <Box px={10}>
      {/* <InputEmployeeView /> */}
      {/* <TestCalendarWeek /> */}
      {/* <TestCalendar /> */}
      {/* <TestDayjs /> */}
      <TestTableMUI />
    </Box>
  );
};

export default Page;
