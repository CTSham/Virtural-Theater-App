import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getMux } from "@/lib/mux";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const mux = getMux();
  const { video } = mux;
  const upload = await video.uploads.create({
    cors_origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    new_asset_settings: { playback_policy: ["signed"] },
  });
  return NextResponse.json({ url: upload.url, id: upload.id });
}
