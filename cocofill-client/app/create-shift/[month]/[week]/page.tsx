import TestCreateShiftView from "../../../_components/test/TestCreateShiftMonthWeek";

export default function WeeklyShiftPage({
  params,
}: {
  params: { month: string; week: string };
}) {
  const { month, week } = params;

  return (
    <div>
      <p>
        {month}月の第{week}週のシフト
      </p>
      <TestCreateShiftView month={parseInt(month)} week={parseInt(week)} />
    </div>
  );
}
