"use client";
import React from "react";
import { useState } from "react";
import { Box, Button, IconButton, Stack, styled } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { calcWeek, hour } from "../../_const/utils";

const TestCalendarWeek = () => {
  const [week, setWeek] = useState(calcWeek()); //calcWeekは現在の週のデータを返している

  const moveWeek = (type: string) => {
    //typeはaddかbackの二択
    const startDay =
      type === "add" //addが押されたら1週間進めて、それ以外(backのとき)は1週間戻す
        ? week[0].add(7, "d").format("YYYY-M-D")
        : week[0].subtract(7, "d").format("YYYY-MM-DD");
    setWeek(calcWeek(startDay)); //weekにstartDayの状態(日付)をセット(更新)
  };

  return (
    <>
      <Stack direction="row" padding={1}>
        <Button onClick={() => setWeek(calcWeek())}>今日</Button>
        {/* ボタンが押されたらcalcWeek(現在の週のデータ返す)をweekにセット */}
        <IconButton onClick={() => moveWeek("back")}>
          <ArrowBackIosNewIcon sx={{ width: 20 }} />
        </IconButton>
        <IconButton sx={{ ml: 1 }} onClick={() => moveWeek("add")}>
          <ArrowForwardIosIcon sx={{ width: 20 }} />
        </IconButton>
      </Stack>
      <Wrapper>
        <FirstGrid>
          <HourGrid>
            {hour(24).map((time) => (
              <Hour key={time}>{time}:00</Hour>
            ))}
          </HourGrid>
          <DaysGrid>
            {week.map((day, index) => (
              <Day key={index}>
                {/* "D"はその日の「日付の数字」を返す(10月19日なら「19」など) */}
                {day.format("D")}
                {/* "ddd"はその日の「曜日」 を短縮形で返す(「日」など) */}
                {day.format("ddd")}
              </Day>
            ))}
          </DaysGrid>
        </FirstGrid>
      </Wrapper>
    </>
  );
};

const Day = styled(Box)(() => ({
  borderLeft: "1px solid #dcdcdc",
}));

const Hour = styled(Box)(() => ({
  marginRight: 3,
  textAlign: "right", //時間を右寄せに表示(左側の50px内での右寄せ)

  position: "relative",
  "&::before": {
    //時間の前に擬似要素(見た目だけ)を追加している
    position: "absolute",
    top: 11, //線の絶対値を指定
    left: 50, //線の絶対値を指定
    content: '""', //線を引くための見えないboxの作成(実際には何も表示しないけれど擬似要素のため「スペース確保」のために使用される)
    width: "calc(100vw - 70px)", //見えないboxのwidth
    borderTop: "1px solid #dcdcdc", //見えないboxにborderを引いてる
  },
}));

const HourGrid = styled(Box)(() => ({
  marginTop: 6,
  display: "grid",
  gridTemplateRows: `repeat(24, 6)`,
}));

const DaysGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr) ",
}));

const Wrapper = styled(Box)(() => ({
  width: "100%",
  margin: 4,
}));

const FirstGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "50px calc(100% - 50px)", //左側を50px, 右側を100%-50pxで区切っている
}));

export default TestCalendarWeek;
