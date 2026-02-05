import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(request) {
  try {
    const session = await request.json();

    const payload = {
      book_id: session.bookId,
      start_time: session.startTime,
      end_time: session.endTime,
      pages_read: session.pagesRead,
      reading_time_minutes: session.readingTimeMinutes
    };

    const { error: sessionError } = await supabase.from("reading_sessions").insert(payload);

    if (sessionError) {
      return NextResponse.json({ message: sessionError.message }, { status: 500 });
    }

    const dateKey = dayjs(session.endTime).format("YYYY-MM-DD");
    const { data: existingStat } = await supabase
      .from("daily_stats")
      .select("id, pages_read, minutes_read")
      .eq("date", dateKey)
      .single();

    if (existingStat) {
      await supabase
        .from("daily_stats")
        .update({
          pages_read: existingStat.pages_read + session.pagesRead,
          minutes_read: existingStat.minutes_read + session.readingTimeMinutes
        })
        .eq("id", existingStat.id);
    } else {
      await supabase.from("daily_stats").insert({
        date: dateKey,
        pages_read: session.pagesRead,
        minutes_read: session.readingTimeMinutes
      });
    }

    return NextResponse.json({ message: "Session saved." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save session.", error: error?.message }, { status: 500 });
  }
}
