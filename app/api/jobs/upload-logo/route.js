import supabase from "@/lib/supabase/client";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const allowedTypes = ['image/png', 'image/jpeg'];
  const maxSize = 2 * 1024 * 1024; // ✅ 2MB

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  if (file.size > maxSize) {
    return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `logos/${nanoid()}-${file.name}`;

  const { error } = await supabase.storage
    .from('logos')
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Supabase upload error:", error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const { data: publicURL } = supabase.storage.from('logos').getPublicUrl(filename);

  return NextResponse.json({ url: publicURL.publicUrl }, { status: 200 });
}
