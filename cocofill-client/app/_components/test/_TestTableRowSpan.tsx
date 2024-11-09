"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// 型指定
interface Column {
  id: "name" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | "sum";
  label: string;
  minWidth?: number;
  align: "center";
}

const columns: Column[] = [
  { id: "name", label: "", minWidth: 40, align: "center" },
  { id: "mon", label: "14日", minWidth: 80, align: "center" },
  { id: "tue", label: "15日", minWidth: 80, align: "center" },
  { id: "wed", label: "16日", minWidth: 80, align: "center" },
  { id: "thu", label: "17日", minWidth: 80, align: "center" },
  { id: "fri", label: "18日", minWidth: 80, align: "center" },
  { id: "sat", label: "19日", minWidth: 80, align: "center" },
  { id: "sun", label: "20日", minWidth: 80, align: "center" },
  { id: "sum", label: "合計", minWidth: 50, align: "center" },
];

// 各従業員のデータを二分割にした形で定義
const rows = [
  {
    name: "立花",
    shifts: ["朝", "朝", "朝", "朝", "朝", "どちらか休み", "どちらか休み"],
  },
  {
    name: "齋藤",
    shifts: ["中or遅", "", "中or遅", "中or遅", "中or遅", "休 希望", "中or遅"],
  },
  { name: "金子", shifts: ["可", "", "休", "", "可", "可", ""] },
  { name: "和田", shifts: ["遅", "遅", "中", "遅", "休", "休", ""] },
];

export default function CustomShiftTable() {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 0,
                    minWidth: column.minWidth,
                    paddingTop: 3,
                    paddingBottom: 3,
                    backgroundColor: "#f5f5f5",
                    borderRight:
                      index < columns.length - 1 ? "1px solid #ddd" : "none",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <>
                {/* 上段：シフトの文字だけ表示 */}
                <TableRow key={`${row.name}-1`}>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    rowSpan={2}
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
                      <Typography variant="body2">{shift}</Typography>
                    </TableCell>
                  ))}
                  <TableCell
                    align="center"
                    sx={{ borderRight: "1px solid #ddd" }}
                  >
                    {/* 合計セル（上段） */}
                  </TableCell>
                </TableRow>
                {/* 下段：すべてのセルに「+」ボタンを表示 */}
                <TableRow key={`${row.name}-2`}>
                  {columns.slice(1).map((_, idx) => (
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
                  <TableCell
                    align="center"
                    sx={{ borderRight: "1px solid #ddd" }}
                  >
                    {/* 合計セル（下段） */}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
