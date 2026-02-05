import dayjs from "dayjs";

export function groupByDate(records) {
  return records.reduce((acc, record) => {
    const dateKey = dayjs(record.date).format("YYYY-MM-DD");
    acc[dateKey] = acc[dateKey] ?? { date: dateKey, pages: 0, minutes: 0 };
    acc[dateKey].pages += record.pages_read ?? 0;
    acc[dateKey].minutes += record.minutes_read ?? 0;
    return acc;
  }, {});
}

export function calculateStreak(dailyStats) {
  const sorted = [...dailyStats].sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
  let streak = 0;
  let cursor = dayjs();

  for (const stat of sorted) {
    const statDay = dayjs(stat.date);
    const sameDay = statDay.isSame(cursor, "day");
    const previousDay = statDay.isSame(cursor.subtract(1, "day"), "day");

    if ((sameDay || previousDay) && stat.minutes_read > 0) {
      streak += 1;
      cursor = statDay;
    } else if (!sameDay) {
      break;
    }
  }

  return streak;
}
