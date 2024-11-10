"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { calcWeek } from "../_const/utils";
import { Dayjs } from "dayjs";
import TestShiftButton from "./test/TestShiftButton";

// 型指定
interface Column {
  id: string;
  label: string;
  date: string;
  align: "center";
  minWidth: number;
}

interface Employee {
  id: number;
  name: string;
  role: string;
  work_style_week: number;
}

interface ShiftSubmission {
  employee_id: number;
  date: string;
  shift: string;
}

interface RowData {
  name: string;
  shifts: Record<string, string>; // キー(日付)がstring型, 値(希望シフト)がstring型という意味
}

export default function CreateShiftView() {
  const [week, setWeek] = useState<Dayjs[]>(calcWeek()); //calcWeekは現在の週のデータを返している
  const [weekKey, setWeekKey] = useState(0); // 週が変わる度にbuttonの表示をリセットするために追加
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shiftSubmissions, setShiftSubmissions] = useState<ShiftSubmission[]>(
    []
  );
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    // method:"GET"は省略
    // 従業員情報の取得
    fetch("http://localhost:3001/api/v1/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));

    // 提出されたシフトの取得
    fetch("http://localhost:3001/api/v1/shift_submissions")
      .then((response) => response.json())
      .then((data) => setShiftSubmissions(data))
      .catch((error) =>
        console.error("Error fetching shift-submissions:", error)
      );
  }, []);

  useEffect(() => {
    // 従業員とシフトの情報からRowsを生成
    const newRows = employees.map((employee) => {
      const shifts: Record<string, string> = {}; // 各日付に対応するシフト情報を格納
      week.forEach((day) => {
        const shiftSubmission = shiftSubmissions.find(
          (submission) =>
            submission.employee_id === employee.id &&
            submission.date === day.format("YYYY-MM-DD")
        );
        shifts[day.format("YYYY-MM-DD")] = shiftSubmission
          ? shiftSubmission.shift
          : ""; // シフトがない場合は空文字を表示
      });
      return { name: employee.name, shifts };
    });
    setRows(newRows);
  }, [employees, shiftSubmissions, week]); // employees,shiftSubmissions,weekのどれかが変更されたらこのuseEffectを実行

  console.log(rows);

  //   カラムを動的に生成;
  const columns: Column[] = [
    { id: "name", label: "", date: "", align: "center" as const, minWidth: 40 }, // as constにしないとエラーが出る
    ...week.map((day) => ({
      id: day.format("YYYY-MM-DD"), // 日付形式でIDを設定
      label: day.format("dd"), // 曜日表示
      date: day.format("D日"), // 日付表示
      align: "center" as const,
      minWidth: 100,
    })),
    {
      id: "sum",
      label: "",
      date: "合計",
      align: "center" as const,
      minWidth: 70,
    },
  ];

  const moveWeek = (type: string) => {
    //typeはaddかbackの二択
    const startDay =
      type === "add" //addが押されたら1週間進めて、それ以外(backのとき)は1週間戻す
        ? week[0].add(7, "day").format("YYYY-MM-DD")
        : week[0].subtract(7, "day").format("YYYY-MM-DD");
    setWeek(calcWeek(startDay)); //weekにstartDayの状態(日付)をセット(更新)
    setWeekKey((prevKey) => prevKey + 1); // 週が変更されるたびに weekKey を更新
  };

  return (
    <Box px={10}>
      <Stack direction="row" padding={1}>
        <Button
          onClick={() => {
            setWeek(calcWeek());
            setWeekKey((prevKey) => prevKey + 1); // 週をリセットする時も weekKey を更新
          }}
        >
          今日
        </Button>
        {/* ボタンが押されたらcalcWeek(現在の週のデータ返す)をweekにセット */}
        <IconButton onClick={() => moveWeek("back")}>
          <ArrowBackIosNewIcon sx={{ width: 20 }} />
        </IconButton>
        <IconButton sx={{ ml: 1 }} onClick={() => moveWeek("add")}>
          <ArrowForwardIosIcon sx={{ width: 20 }} />
        </IconButton>
      </Stack>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 650 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* 曜日 */}
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      paddingTop: 3, //このpaddingはセルの高さを短くさせるためのもの
                      paddingBottom: 3,
                      borderRight: "1px solid #ddd",
                      backgroundColor: "#F0F0F0",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {/* 日付 */}
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      top: 31, //tableから31pxの位置に固定
                      minWidth: column.minWidth,
                      paddingTop: 3, //このpaddingはセルの高さを短くさせるためのもの
                      paddingBottom: 3,
                      borderRight:
                        index < columns.length ? "1px solid #ddd" : "none",
                      backgroundColor: "#F0F0F0",
                    }}
                  >
                    {column.date}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.name}>
                  {/* 上段：シフト希望の表示 */}
                  <TableRow key={`${row.name}-1`}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      rowSpan={2} //名前のセルは上下のセルを統合
                      sx={{ borderRight: "1px solid #ddd" }}
                    >
                      {row.name}
                    </TableCell>
                    {columns.slice(1, -1).map((column, idx) => {
                      const shiftValue = row.shifts[column.id] || ""; // shiftの中で、column.id(YYYY-MM-DD型の日付)と一致したら、その値(可など)を表示
                      console.log(
                        "Row:",
                        row.name,
                        "Column ID:",
                        column.id,
                        "Shift Value:",
                        shiftValue
                      ); // デバッグ用
                      return (
                        <TableCell
                          key={`${row.name}-shift-${idx}`}
                          align="center"
                          sx={{ borderRight: "1px solid #ddd" }}
                        >
                          {shiftValue}
                        </TableCell>
                      );
                    })}
                    <TableCell
                      align="center"
                      rowSpan={2} // 合計セルも上下のセルを統合
                      sx={{ borderRight: "1px solid #ddd" }}
                    >
                      {/* 合計セル（上段と下段を統合） */}
                    </TableCell>
                  </TableRow>
                  {/* 下段：「+」ボタン表示 */}
                  <TableRow key={`${row.name}-2`}>
                    {columns.slice(1, -1).map((column, idx) => (
                      <TableCell
                        key={`${row.name}-button-${idx}`}
                        align="center"
                        sx={{ borderRight: "1px solid #ddd" }}
                      >
                        <TestShiftButton
                          id={`${row.name}-${column.id}`} // 日付キーと一致
                          weekKey={weekKey} // 親からweekKey(現在の週の情報)を渡す
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
