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
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { calcWeek } from "../_const/utils";
import { Dayjs } from "dayjs";
import TestShiftButton from "./test/TestShiftButton";
import { calcWeekWorks } from "../_const/calc-week-works";
import CompareWorkStyleWeek from "./CompareWorkStyleWeek";
import { calcWeekdayWorks } from "../_const/calc-weekday-works";
import { calcWeekendWorks } from "../_const/calc-weekend-works";
import {
  Employee,
  ShiftSubmission,
  RowData,
  Column,
} from "../_types/create-shift";

const CreateShiftView = () => {
  const [week, setWeek] = useState<Dayjs[]>(calcWeek()); //calcWeekは現在の週のデータを返している
  const [weekKey, setWeekKey] = useState(0); // 週が変わる度にbuttonの表示をリセット(+の表示に)するために追加
  const [employees, setEmployees] = useState<Employee[]>([]); // データベースから取得した従業員情報を入れるところ
  const [shiftSubmissions, setShiftSubmissions] = useState<ShiftSubmission[]>(
    []
  ); // データベースから取得した提出されたシフトを入れるところ
  const [rows, setRows] = useState<RowData[]>([]); // 列(名前の列)
  const [workCounts, setWorkCounts] = useState<
    Record<
      string, // キー(従業員の名前)がstring型
      {
        workCountWeek: number;
        workCountWeekday: number;
        workCountWeekend: number;
      } // 値(計算された出勤数)オブジェクトでnumber型
    >
  >({});

  const moveWeek = (type: string) => {
    //typeはaddかbackの二択
    const startDay =
      type === "add" //addが押されたら1週間進めて、それ以外(backのとき)は1週間戻す
        ? week[0].add(7, "day").format("YYYY-MM-DD")
        : week[0].subtract(7, "day").format("YYYY-MM-DD");
    setWeek(calcWeek(startDay)); //weekにstartDayの状態(日付)をセット(更新)
    setWeekKey((prevKey) => prevKey + 1); // 週が変更されるたびに weekKey を更新
  };

  useEffect(() => {
    // 従業員データの取得
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees`
        );
        const data = await response.json();
        console.log("Fetched employees data:", data);
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    // シフト提出データの取得
    const fetchShiftSubmissions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/shift_submissions`
        );
        const data = await response.json();
        console.log("Fetched shift submissions data:", data);
        setShiftSubmissions(data);
      } catch (error) {
        console.error("Error fetching shift submissions:", error);
      }
    };

    // 両方のデータを非同期で取得
    const fetchData = async () => {
      await Promise.all([fetchEmployees(), fetchShiftSubmissions()]);
    };

    fetchData();
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
          ? shiftSubmission.shift_request
          : ""; // シフトがない場合は空文字を表示
      });
      return { name: employee.name, shifts };
    });
    setRows(newRows);
  }, [employees, shiftSubmissions, week]); // employees,shiftSubmissions,weekのどれかが変更されたらこのuseEffectを実行

  // デバッグ用
  // console.log(rows);

  //   カラムを動的に生成;
  const columns: Column[] = [
    { id: "name", label: "", date: "", align: "center" as const, minWidth: 40 }, // as constにしないとTypeScriptエラーが出る
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
      date: "希望比較",
      align: "center" as const,
      minWidth: 100,
    },
  ];

  const handleUpdate = () => {
    const startDate = week[0].format("YYYY-MM-DD"); // 週の初めの日付
    const endDate = week[week.length - 1].format("YYYY-MM-DD"); // 週の終わりの日付

    // 空のオブジェクトを用意して出勤データをここに格納
    const newWorkCounts: Record<
      string,
      {
        workCountWeek: number;
        workCountWeekday: number;
        workCountWeekend: number;
      }
    > = {};

    // 従業員ごとに出勤データを計算してオブジェクトに追加
    employees.forEach((employee) => {
      const workCountWeek = calcWeekWorks(employee.name, startDate, endDate);
      const workCountWeekday = calcWeekdayWorks(
        employee.name,
        startDate,
        endDate
      );
      const workCountWeekend = calcWeekendWorks(
        employee.name,
        startDate,
        endDate
      );

      // 従業員名をキーにして出勤データを格納
      newWorkCounts[employee.name] = {
        workCountWeek,
        workCountWeekday,
        workCountWeekend,
      };
    });

    // 計算結果を入れる
    setWorkCounts(newWorkCounts);
  };

  return (
    <Box px={9}>
      <Typography fontSize={23} textAlign={"left"} ml={1} mt={1}>
        {`${week[0].format("YYYY年MM月DD日(ddd)")}〜${week[
          week.length - 1
        ].format("MM月DD日(ddd)")}`}
      </Typography>
      <Stack direction="row" pb={1.5} pt={0.5}>
        {/* <Button
          onClick={() => {
            setWeek(calcWeek());
            setWeekKey((prevKey) => prevKey + 1); // 週をリセットする時も weekKey を更新
          }}
        >
          今日
        </Button> */}
        {/* ボタンが押されたらcalcWeek(現在の週のデータ返す)をweekにセット */}
        <IconButton onClick={() => moveWeek("back")}>
          <ArrowBackIosNewIcon sx={{ width: 20 }} />
        </IconButton>
        <IconButton sx={{ ml: 1 }} onClick={() => moveWeek("add")}>
          <ArrowForwardIosIcon sx={{ width: 20 }} />
        </IconButton>
        <Button
          variant="outlined"
          sx={{ ml: "auto", mr: 0 }}
          onClick={handleUpdate}
        >
          更新
        </Button>
      </Stack>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 610 }}>
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
              {rows.map((row) => {
                const counts = workCounts[row.name] || {
                  workCountWeek: 0,
                  workCountWeekday: 0,
                  workCountWeekend: 0,
                }; // 値が未定義の場合に0を設定しないとエラーになる

                return (
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
                        // デバッグ用
                        // console.log(
                        //   "Row:",
                        //   row.name,
                        //   "Column ID:",
                        //   column.id,
                        //   "Shift Value:",
                        //   shiftValue
                        // );
                        console.log(rows);
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
                      {/* 合計セル（上段と下段を統合） */}
                      <TableCell
                        align="center"
                        rowSpan={2} // 合計セルも上下のセルを統合
                        sx={{ borderRight: "1px solid #ddd" }}
                      >
                        {/* 出勤回数と希望の出勤回数との比較 */}
                        <CompareWorkStyleWeek
                          workStyleWeek={
                            employees.find((e) => e.name === row.name) // 従業員情報の名前とrowの名前が一致したらwork_style_week(希望の出勤日数)を入れる
                              ?.work_style_week || 0
                          }
                          weekdayOffRequests={
                            employees.find((e) => e.name === row.name) // 従業員情報の名前とrowの名前が一致したらweekday_off_requests(希望の平日休みたい日数)を入れる
                              ?.weekday_off_requests || 0
                          }
                          weekendOffRequests={
                            employees.find((e) => e.name === row.name) // 従業員情報の名前とrowの名前が一致したらweekend_off_requests(希望の休日休みたい日数)を入れる
                              ?.weekend_off_requests || 0
                          }
                          workCountWeek={counts.workCountWeek}
                          workCountWeekday={counts.workCountWeekday}
                          workCountWeekend={counts.workCountWeekend}
                        />
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
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
export default CreateShiftView;
