import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await auth()
  const me = session?.user?.email
  const user = me ? await prisma.user.findUnique({ where: { email: me } }) : null
  if (user?.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.formData()
  const movieId = String(data.get('movieId') || '')
  const muxPlaybackId = String(data.get('muxPlaybackId') || '')
  const trailerMuxPlaybackId = String(data.get('trailerMuxPlaybackId') || '')

  await prisma.movie.update({ where: { id: movieId }, data: { muxPlaybackId: muxPlaybackId || null, trailerMuxPlaybackId: trailerMuxPlaybackId || null } })
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/admin`, { status: 303 })
}
