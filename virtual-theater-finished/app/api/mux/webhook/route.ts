import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/db'

function verifyMuxSignature(rawBody: string, signatureHeader: string | null, secret: string) {
  if (!signatureHeader) return false
  // Header format: "t=timestamp,v1=signature"
  const parts = Object.fromEntries(signatureHeader.split(',').map(kv => kv.split('=')))
  const v1 = parts['v1']
  if (!v1) return false
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(rawBody)
  const expected = hmac.digest('hex')
  // timing-safe compare
  return crypto.timingSafeEqual(Buffer.from(v1), Buffer.from(expected))
}

export async function POST(req: NextRequest) {
  const raw = await req.text()
  const sig = req.headers.get('mux-signature')
  const ok = verifyMuxSignature(raw, sig, process.env.MUX_WEBHOOK_SECRET || '')
  if (!ok) return new NextResponse('Invalid signature', { status: 401 })

  const body = JSON.parse(raw)
  const type = body?.type

  if (type === 'video.asset.ready') {
    const playbackId = body?.data?.playback_ids?.[0]?.id as string | undefined
    const passthrough = body?.data?.passthrough as string | undefined
    if (playbackId && passthrough) {
      // passthrough format: "<movieId>:feature" or "<movieId>:trailer"
      const [movieId, kind] = passthrough.split(':')
      if (movieId && kind) {
        await prisma.movie.update({
          where: { id: movieId },
          data: kind === 'trailer' ? { trailerMuxPlaybackId: playbackId } : { muxPlaybackId: playbackId }
        })
      }
    }
  }

  return NextResponse.json({ ok: true })
}
