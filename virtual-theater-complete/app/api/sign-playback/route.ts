import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getMux } from '@/lib/mux'

export async function GET(req: NextRequest) {
  const movieId = req.nextUrl.searchParams.get('movieId') as string
  const preview = req.nextUrl.searchParams.get('preview')
  const movie = await prisma.movie.findUnique({ where: { id: movieId } })
  if (!movie) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const mux = getMux()
  const { video } = mux
  const playbackId = preview ? movie.trailerMuxPlaybackId : movie.muxPlaybackId
  if (!playbackId) return NextResponse.json({ error: 'Playback not ready' }, { status: 400 })

  // Generate a signed URL (playback ID + signing key envs on project)
  const token = await video.playbackIds.createToken({
    id: playbackId,
    params: { expiration: Math.floor(Date.now() / 1000) + 60 * 10 } // 10 minutes
  })

  const url = `https://stream.mux.com/${playbackId}.m3u8?token=${token}`
  return NextResponse.json({ url })
}
