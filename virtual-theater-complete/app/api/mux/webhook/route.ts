import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getMux } from '@/lib/mux'

export async function POST(req: NextRequest) {
  const body = await req.json()
  // Basic, unauthenticated example. In production, verify Mux signature header.
  const type = body?.type
  if (type === 'video.asset.ready') {
    const playbackId = body?.data?.playback_ids?.[0]?.id
    const movieId = body?.data?.passthrough // we'll set this when creating assets if needed
    // If you attached movieId via passthrough, update movie here.
    // This demo leaves manual association, but you can extend as needed.
  }
  return NextResponse.json({ ok: true })
}
