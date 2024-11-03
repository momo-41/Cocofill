"use client";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import * as React from "react";

//型指定
interface Column {
  id: "name" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | "sum";
  label: string;
  minWidth?: number;
  date: string;
  align: "center";
}

const columns: Column[] = [
  { id: "name", label: "", date: "", minWidth: 40, align: "center" },
  { id: "mon", label: "月", date: "14日", minWidth: 80, align: "center" },
  { id: "tue", label: "火", date: "15日", minWidth: 80, align: "center" },
  { id: "wed", label: "水", date: "16日", minWidth: 80, align: "center" },
  { id: "thu", label: "木", date: "17日", minWidth: 80, align: "center" },
  { id: "fri", label: "金", date: "18日", minWidth: 80, align: "center" },
  { id: "sat", label: "土", date: "19日", minWidth: 80, align: "center" },
  { id: "sun", label: "日", date: "20日", minWidth: 80, align: "center" },
  { id: "sum", label: "", date: "合計", minWidth: 50, align: "center" },
];

const rows = [
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
    shifts: ["朝", "朝", "朝", "朝", "朝", "朝", "朝"],
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
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* 曜日 */}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
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
                      <Button variant="outlined" size="small">
                        ＋
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
