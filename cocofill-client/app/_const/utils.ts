import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja"); //日本語表示

export function calcWeek(start?: string): Dayjs[] {
  //現在の週のデータを計算
  const date = start ? dayjs(start) : dayjs(); // 引数のstartに日付が入っていたらその日付を使ってdateに日付を返し、そうでない場合は現在の日付を返す
  const day = date.day(); // dateから曜日を取得(0[日]~6[土]で取得)

  const startDay =
    day === 0 ? date.subtract(6, "day") : date.subtract(day - 1, "day"); // 月曜始まりにするための調整

  const week: Dayjs[] = []; // Dayjs型の配列として初期化
  for (let day = 0; day < 7; day++) {
    week.push(startDay.add(day, "day")); // startDayに曜日の数字を足すことでその曜日と日付を取得している
  }
  return week;
}

// 特定の月と週の開始日のみを返す
export function calcMonthWeek(month: number, week: number): Dayjs {
  // 月の初日を取得し、指定された週に進める
  const startOfMonth = dayjs()
    .month(month - 1)
    .startOf("month");
  const startOfWeek = startOfMonth.add((week - 1) * 7, "day");

  return startOfWeek; // 週の初日だけを返す
}

//"d"は「日付の操作」の単位
//"day"は曜日に基づいて日付を操作できる

//以下のhourはTestコンポーネントで必要

export const hour = (keys: number) => [...Array(keys).keys()];
