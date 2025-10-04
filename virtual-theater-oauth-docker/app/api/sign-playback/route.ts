import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getMux } from '@/lib/mux'

export async function GET(req: NextRequest) {
  const movieId = req.nextUrl.searchParams.get('movieId') as string
  const movie = await prisma.movie.findUnique({ where: { id: movieId } })
  if (!movie?.muxPlaybackId) return NextResponse.json({ error: 'Playback not ready' }, { status: 400 })
  const mux = getMux()
  const token = await mux.video.playbackIds.createToken({ id: movie.muxPlaybackId, params: { expiration: Math.floor(Date.now()/1000) + 600 } })
  return NextResponse.json({ url: `https://stream.mux.com/${movie.muxPlaybackId}.m3u8?token=${token}` })
}
