"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//型指定
interface Column {
  id: "name" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | "sum";
  label: string;
  minWidth?: number;
  align: "center";
}

const columns: Column[] = [
  { id: "name", label: "", minWidth: 40, align: "center" }, //minWidthは適当もしくはPC専用なら不要
  { id: "mon", label: "11日", minWidth: 80, align: "center" },
  {
    id: "tue",
    label: "12日",
    minWidth: 80,
    align: "center",
  },
  {
    id: "wed",
    label: "13日",
    minWidth: 80,
    align: "center",
  },
  {
    id: "thu",
    label: "14日",
    minWidth: 80,
    align: "center",
  },
  {
    id: "fri",
    label: "15日",
    minWidth: 80,
    align: "center",
  },
  {
    id: "sat",
    label: "16日",
    minWidth: 80,
    align: "center",
  },
  {
    id: "sun",
    label: "17日",
    minWidth: 80,
    align: "center",
  },
  {
    id: "sum",
    label: "合計",
    minWidth: 50,
    align: "center",
  },
];

function createData(
  name: string,
  mon: string,
  tue: string,
  wed: string,
  thu: string,
  fri: string,
  sat: string,
  sun: string,
  sum: string
) {
  return { name, mon, tue, wed, thu, fri, sat, sun, sum };
}

const rows = [
  createData("立花", "可", "可", "可", "可", "可", "可", "可", ""),
  createData("齋藤", "可", "可", "可", "可", "可", "可", "可", ""),
  createData(
    "金子",
    "朝",
    "朝",
    "朝",
    "朝",
    "朝",
    "どちらか休み",
    "どちらか休み",
    ""
  ),
  createData(
    "和田",
    "中or遅",
    "中or遅",
    "中or遅",
    "中or遅",
    "中or遅",
    "休 希望",
    "中or遅",
    ""
  ),
  createData("大橋", "可", "休", "休", "可", "休", "可", "可", ""),
  createData("折口", "可", "可", "可", "可", "可", "休", "休", ""),
  createData("今井", "朝", "朝", "朝", "朝", "朝", "朝", "朝", ""), //ここからは適当
  createData("佐々木", "朝", "朝", "休 希望", "朝", "朝", "朝", "朝", ""),
  createData("石上", "朝", "朝", "朝", "朝", "朝", "朝", "朝", ""),
  createData("渡辺", "朝", "朝", "朝", "朝", "朝", "朝", "朝", ""),
];

export default function TestTableMUI() {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* 曜日をマップさせたい */}
              <TableCell
                align="center"
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRight: "1px solid #ddd",
                  backgroundColor: "#E8E8E8",
                }}
              >
                {" "}
              </TableCell>
              <TableCell
                align="center"
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRight: "1px solid #ddd",
                  backgroundColor: "#E8E8E8",
                }}
              >
                月
              </TableCell>
              <TableCell
                align="center"
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRight: "1px solid #ddd",
                  backgroundColor: "#E8E8E8",
                }}
              >
                火
              </TableCell>
              <TableCell
                align="center"
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRight: "1px solid #ddd",
                  backgroundColor: "#E8E8E8",
                }}
              >
                水
              </TableCell>
              <TableCell
                align="center"
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRight: "1px solid #ddd",
                  backgroundColor: "#E8E8E8",
                }}
              >
                木
              </TableCell>
              <TableCell
                align="center"
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRight: "1px solid #ddd",
                  backgroundColor: "#E8E8E8",
                }}
              >
                金
              </TableCell>
              <TableCell
                align="center"
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRight: "1px solid #ddd",
                  backgroundColor: "#E8E8E8",
                }}
              >
                土
              </TableCell>
              <TableCell
                align="center"
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRight: "1px solid #ddd",
                  backgroundColor: "#E8E8E8",
                }}
              >
                日
              </TableCell>
              <TableCell
                align="center"
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRight: "1px solid #ddd",
                  backgroundColor: "#E8E8E8",
                }}
              >
                合計
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 31,
                    minWidth: column.minWidth,
                    paddingTop: 3,
                    paddingBottom: 3,
                    borderRight:
                      index < columns.length - 1 ? "1px solid #ddd" : "none",
                    backgroundColor: "#E8E8E8",
                  }} //このpaddingはセルの高さを短くさせるためのもの
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  width={60}
                  height={80}
                  sx={{ borderRight: "1px solid #ddd" }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #ddd" }}
                >
                  {row.mon}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #ddd" }}
                >
                  {row.tue}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #ddd" }}
                >
                  {row.wed}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #ddd" }}
                >
                  {row.thu}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #ddd" }}
                >
                  {row.fri}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #ddd" }}
                >
                  {row.sat}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #ddd" }}
                >
                  {row.sun}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ borderRight: "1px solid #ddd" }}
                >
                  {row.sum}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

//TestTableMUI
