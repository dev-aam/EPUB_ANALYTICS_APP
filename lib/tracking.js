import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export function startSession(bookId) {
  return {
    id: uuidv4(),
    bookId,
    startTime: dayjs().toISOString(),
    pagesRead: 0
  };
}

export function endSession(session) {
  const endTime = dayjs();
  const startTime = dayjs(session.startTime);
  const readingTimeMinutes = Math.max(endTime.diff(startTime, "minute"), 1);

  return {
    ...session,
    endTime: endTime.toISOString(),
    readingTimeMinutes
  };
}
