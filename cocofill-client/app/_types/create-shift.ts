export type Column = {
  id: string;
  label: string;
  date: string;
  align: "center";
  minWidth: number;
};

export type Employee = {
  id: number;
  name: string;
  role: string;
  work_style_week: number;
  weekday_off_requests: number;
  weekend_off_requests: number;
};

export type ShiftSubmission = {
  employee_id: number;
  date: string;
  shift_request: string;
};

export type RowData = {
  name: string;
  shifts: Record<string, string>; // キー(日付)がstring型, 値(希望シフト)がstring型という意味
};
