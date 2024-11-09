"use client";
import * as React from "react";
import { useState } from "react";
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
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { calcWeek } from "../../const/utils";
import { Dayjs } from "dayjs";
import ShiftButton from "../ShiftButton";

// 型指定
interface Column {
  id: string;
  label: string;
  date: string;
  align: "center";
  minWidth: number;
}

interface RowData {
  name: string;
  shifts: string[];
}

const rows: RowData[] = [
  {
    name: "立花",
    shifts: ["可", "可", "可", "可", "可", "可", "可"],
  },
  {
    name: "齋藤",
    shifts: ["可", "可", "可", "可", "可", "可", "可"],
  },
  {
    name: "金子",
    shifts: ["朝", "朝", "朝", "朝", "朝", "どちらか休み", "どちらか休み"],
  },
  {
    name: "和田",
    shifts: [
      "中or遅",
      "中or遅",
      "中or遅",
      "中or遅",
      "中or遅",
      "休 希望",
      "中or遅",
    ],
  },
  {
    name: "大橋",
    shifts: ["可", "休", "休", "可", "休", "可", "可"],
  },
  {
    name: "折口",
    shifts: [
      "和田",
      "中or遅",
      "中or遅",
      "中or遅",
      "中or遅",
      "中or遅",
      "休 希望",
    ],
  },
  {
    name: "今井",
    shifts: ["朝", "朝", "朝", "朝", "朝", "休", "休"],
  },
  {
    name: "佐々木",
    shifts: ["朝", "朝", "休 希望", "朝", "朝", "朝", "朝"],
  },
  {
    name: "石上",
    shifts: ["朝", "朝", "朝", "朝", "朝", "朝", "朝"],
  },
  {
    name: "渡辺",
    shifts: ["朝", "朝", "朝", "朝", "朝", "朝", "朝"],
  },
];

export default function TestTableMUI() {
  const [week, setWeek] = useState<Dayjs[]>(calcWeek()); //calcWeekは現在の週のデータを返している

  const [weekKey, setWeekKey] = useState(0); // 週が変わる度にbuttonの表示をリセットするために追加

  // カラムを動的に生成
  const columns: Column[] = [
    { id: "name", label: "", date: "", align: "center" as const, minWidth: 40 }, // as constにしないとエラーが出る
    ...week.map((day, index) => ({
      id: `day-${index}`,
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
    <>
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
                <>
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
                    {row.shifts.map((shift, idx) => (
                      <TableCell
                        key={`${row.name}-shift-${idx}`}
                        align="center"
                        sx={{ borderRight: "1px solid #ddd" }}
                      >
                        {shift}
                      </TableCell>
                    ))}
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
                    {columns.slice(1, -1).map((_, idx) => (
                      <TableCell
                        key={`${row.name}-button-${idx}`}
                        align="center"
                        sx={{ borderRight: "1px solid #ddd" }}
                      >
                        <ShiftButton
                          id={`${row.name}-${week[idx].format("YYYY-MM-DD")}`}
                          weekKey={weekKey} // 親から weekKey を渡す
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
