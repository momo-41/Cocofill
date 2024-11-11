import React from "react";

interface CompareShiftRequestProps {
  shiftValue: string;
  selectedValue: string;
}

const CompareShiftRequest: React.FC<CompareShiftRequestProps> = ({
  shiftValue,
  selectedValue,
}) => {
  // シフト希望と選択値を比較
  const displayValue = shiftValue === selectedValue ? "◎" : "※";

  return <div>{displayValue}</div>;
};

export default CompareShiftRequest;
