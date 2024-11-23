//平日のお休み回数の計算
export function calcWeekdayWorks(
  employeeName: string,
  startDate: string,
  endDate: string
): number {
  let count = 0;
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const dayOfWeek = currentDate.getDay();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const key = `${employeeName}-${formattedDate}`;
    const value = localStorage.getItem(key);

    // 平日の中で「休」以外の値をカウント
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && value && value !== "休") {
      count++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
}
