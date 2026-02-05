import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file provided." }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("books")
      .upload(fileName, file, { contentType: file.type });

    if (uploadError) {
      return NextResponse.json({ message: uploadError.message }, { status: 500 });
    }

    const { data: publicUrl } = supabase.storage.from("books").getPublicUrl(uploadData.path);

    const bookPayload = {
      title: file.name.replace(/\.epub$/i, ""),
      author: "Unknown author",
      file_url: publicUrl.publicUrl
    };

    const { error: insertError } = await supabase.from("books").insert(bookPayload);

    if (insertError) {
      return NextResponse.json({ message: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Upload complete!", book: bookPayload }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Upload failed.", error: error?.message }, { status: 500 });
  }
}
