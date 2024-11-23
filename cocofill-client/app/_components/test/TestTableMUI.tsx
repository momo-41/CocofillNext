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
import { calcWeek } from "../../_const/utils";
import { Dayjs } from "dayjs";
import TestShiftButton from "./TestShiftButton";

// 型指定
type Column = {
  id: string;
  label: string;
  date: string;
  align: "center";
  minWidth: number;
};

type RowData = {
  name: string;
  shifts: Record<string, string>; // 日付ごとのシフト情報
};

const rows: RowData[] = [
  {
    name: "立花",
    shifts: {
      "2024-11-11": "可",
      "2024-11-12": "可",
      "2024-11-13": "可",
      "2024-11-14": "可",
      "2024-11-15": "可",
      "2024-11-16": "可",
      "2024-11-17": "可",
    },
  },
  {
    name: "齋藤",
    shifts: {
      "2024-11-11": "可",
      "2024-11-12": "休み", //病院がある
      "2024-11-13": "可",
      "2024-11-14": "可",
      "2024-11-15": "可",
      "2024-11-16": "可",
      "2024-11-17": "可",
    },
  },
  {
    name: "金子", //副業してて土日休み希望
    shifts: {
      "2024-11-11": "朝",
      "2024-11-12": "朝",
      "2024-11-13": "朝",
      "2024-11-14": "朝",
      "2024-11-15": "朝",
      "2024-11-16": "朝",
      "2024-11-17": "朝",
    },
  },
  {
    name: "和田",
    shifts: {
      "2024-11-11": "可",
      "2024-11-12": "可",
      "2024-11-13": "可",
      "2024-11-14": "可",
      "2024-11-15": "可",
      "2024-11-16": "休み",
      "2024-11-17": "休み", //わざと可で出しちゃった体にする？
    },
  },
  {
    name: "大橋",
    shifts: {
      "2024-11-11": "中or遅",
      "2024-11-12": "中or遅",
      "2024-11-13": "中or遅",
      "2024-11-14": "中or遅",
      "2024-11-15": "中or遅",
      "2024-11-16": "休み",
      "2024-11-17": "中or遅",
    },
  },
  {
    name: "折口",
    shifts: {
      "2024-11-11": "可",
      "2024-11-12": "可",
      "2024-11-13": "可",
      "2024-11-14": "可",
      "2024-11-15": "休み",
      "2024-11-16": "可",
      "2024-11-17": "可",
    },
  },
  {
    name: "今井",
    shifts: {
      "2024-11-11": "可",
      "2024-11-12": "可",
      "2024-11-13": "可",
      "2024-11-14": "可",
      "2024-11-15": "可",
      "2024-11-16": "可",
      "2024-11-17": "可",
    },
  },
  {
    name: "佐々木",
    shifts: {
      "2024-11-11": "可",
      "2024-11-12": "可",
      "2024-11-13": "休み",
      "2024-11-14": "可",
      "2024-11-15": "可",
      "2024-11-16": "可",
      "2024-11-17": "可",
    },
  },
  {
    name: "石上",
    shifts: {
      "2024-11-11": "可",
      "2024-11-12": "可",
      "2024-11-13": "可",
      "2024-11-14": "可",
      "2024-11-15": "可",
      "2024-11-16": "朝",
      "2024-11-17": "可",
    },
  },
  {
    name: "渡辺",
    shifts: {
      "2024-11-11": "可",
      "2024-11-12": "休み",
      "2024-11-13": "可",
      "2024-11-14": "休み",
      "2024-11-15": "休み",
      "2024-11-16": "可",
      "2024-11-17": "可",
    },
  },
];

const TestTableMUI = () => {
  const [week, setWeek] = useState<Dayjs[]>(calcWeek()); //calcWeekは現在の週のデータを返している

  const [weekKey, setWeekKey] = useState(0); // 週が変わる度にbuttonの表示をリセットするために追加

  const columns: Column[] = [
    { id: "name", label: "", date: "", align: "center" as const, minWidth: 40 }, // as constにしないとTypeScriptのエラーが出る
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
                <React.Fragment key={row.name}>
                  {/* 上段：シフト希望の表示 */}
                  <TableRow key={`${row.name}-1`}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      rowSpan={2} // 名前のセルは上下のセルを統合
                      sx={{ borderRight: "1px solid #ddd" }}
                    >
                      {row.name}
                    </TableCell>
                    {columns.slice(1, -1).map((column, idx) => {
                      const shiftValue = row.shifts[column.id] || ""; //一致した日付のシフトを表示(日付が無い場合は空文字)
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
                          weekKey={weekKey} // 親から weekKey を渡す
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
    </>
  );
};

export default TestTableMUI;
