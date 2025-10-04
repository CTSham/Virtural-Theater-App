import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getMux } from '@/lib/mux'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const mux = getMux()
  const { video } = mux
  const { movieId, kind } = await req.json() as { movieId: string, kind: 'feature' | 'trailer' }
  const upload = await video.uploads.create({
    cors_origin: process.env.NEXT_PUBLIC_SITE_URL,
    new_asset_settings: { playback_policy: ['signed'], passthrough: `${movieId}:${kind}` }
  })
  return NextResponse.json({ url: upload.url, id: upload.id })
}
