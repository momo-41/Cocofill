import React from "react";

interface CompareWorkStyleWeekProps {
  workDaysCount: number;
  workStyleWeek: number;
}

const CompareWorkStyleWeek: React.FC<CompareWorkStyleWeekProps> = ({
  workDaysCount,
  workStyleWeek,
}) => {
  return <div>{workDaysCount > workStyleWeek ? "※" : "◎"}</div>;
};

export default CompareWorkStyleWeek;
