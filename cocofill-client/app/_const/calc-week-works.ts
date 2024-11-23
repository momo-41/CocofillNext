//定義名をわかりやすく設定できるので、for文ではなくwhile文を採用
//1週間の出勤回数を計算
export function calcWeekWorks(
  employeeName: string,
  startDate: string,
  endDate: string
): number {
  let count = 0;

  // 開始日から終了日までの日付を生成して繰り返し処理
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const formattedDate = currentDate.toISOString().split("T")[0]; // "YYYY-MM-DD"形式に変換
    const key = `${employeeName}-${formattedDate}`; //localStorageにデータが"名前(row)-日付(colum)"で保存されているためそこと一致させる
    const value = localStorage.getItem(key);

    // 「休」以外の値をカウント
    if (value && value !== "休") {
      count++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}
