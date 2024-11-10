import React from "react";
// import InputEmployeeView from "./_components/InputEmployeeView";
// import TestCalendarWeek from "./_components/test/TestCalendarWeek";
import TestTableMUI from "./_components/test/TestTableMUI";
import { Box } from "@mui/material";
// import EmployeesView from "./_components/EmployeesView";
// import TestCalendar from "./_components/test/_TestCalendar";
// import TestDayjs from "./_components/test/_TestDayjs";

const Page = () => {
  return (
    <Box px={10}>
      {/* <InputEmployeeView /> */}
      {/* <EmployeesView /> */}
      {/* <TestCalendar /> */}
      {/* <TestDayjs /> */}
      <TestTableMUI />
      {/* <TestCalendarWeek /> */}
    </Box>
  );
};

export default Page;
