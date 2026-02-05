import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";
import { calculateStreak, groupByDate } from "../../../lib/analytics";

export async function GET() {
  const { data: stats } = await supabase.from("daily_stats").select("date, pages_read, minutes_read");
  const { data: books } = await supabase.from("books").select("id");

  const grouped = groupByDate(stats ?? []);
  const pagesData = Object.values(grouped).map((item) => ({ date: item.date, pages: item.pages }));
  const minutesData = Object.values(grouped).map((item) => ({ date: item.date, minutes: item.minutes }));

  const totals = {
    booksCompleted: books?.length ?? 0,
    pagesRead: pagesData.reduce((sum, item) => sum + item.pages, 0),
    minutesRead: minutesData.reduce((sum, item) => sum + item.minutes, 0)
  };

  const streak = calculateStreak(stats ?? []);

  return NextResponse.json({ pagesData, minutesData, totals, streak });
}
