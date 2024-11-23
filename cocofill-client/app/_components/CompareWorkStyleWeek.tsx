import React from "react";
import { CompareWorkStyleWeekProps } from "../_types/compare-work-style-week";

const CompareWorkStyleWeek: React.FC<CompareWorkStyleWeekProps> = ({
  workStyleWeek,
  weekdayOffRequests,
  weekendOffRequests,
  workCountWeek,
  workCountWeekday,
  workCountWeekend,
}) => {
  const isWeekOver = workCountWeek > workStyleWeek;
  const isWeekdayOver = 5 - workCountWeekday < weekdayOffRequests;
  const isWeekendOver = 2 - workCountWeekend < weekendOffRequests;

  return (
    <div>
      {/* 週間勤務 */}
      {isWeekOver ? "※" : "◎"} 週間勤務 {workCountWeek} 日 ({workStyleWeek})
      <br />
      {/* 平日勤務 */}
      {isWeekdayOver ? "※" : "◎"} 平日勤務 {workCountWeekday} 日 (
      {5 - weekdayOffRequests})
      <br />
      {/* 休日勤務 */}
      {isWeekendOver ? "※" : "◎"} 休日勤務 {workCountWeekend} 日 (
      {2 - weekendOffRequests})
    </div>
  );
};

// ※ 週間勤務 6 日 (5)
// ◎ 平日勤務 5 日 (5)
// ◎ 休日勤務 1 日 (2)
// ()の中は ※ だった場合にその勤務日数を何日にすれば ◎ なるのかの日数。
// 上記の場合、週間勤務が ※ で、()の中には5と書いてあるので、週間勤務を5日すれば ◎ になる。

export default CompareWorkStyleWeek;

// 元々 "※" か "◎" を表示するためのコンポーネントだったが、勤務日数の隣に"※"や"◎"などの印を表示したかったため、
// 出勤日数に関してもpropsで持たせてこのコンポーネントでまとめて表示している。
// workCountWeekが無駄に移動しすぎている気がするので、このコンポーネントを分割するのは適切ではないかもしれない
