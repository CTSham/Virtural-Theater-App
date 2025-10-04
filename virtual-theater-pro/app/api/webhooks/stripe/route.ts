import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const sig = headers().get('stripe-signature') as string
  const raw = await req.text()
  const stripe = getStripe()

  let event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET as string)
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const meta = session.metadata || {}
    const movieId = meta.movieId as string
    const purchaseType = meta.purchaseType as string

    // TODO: associate with authenticated user; for now store anonymous
    await prisma.purchase.create({
      data: {
        movieId,
        type: purchaseType === 'buy' ? 'BUY' : 'RENT',
        // 48h rental expiry; BUY = null
        expiresAt: purchaseType === 'rent' ? new Date(Date.now() + 48 * 3600 * 1000) : null
      }
    })
  }

  return NextResponse.json({ received: true })
}

export const config = { api: { bodyParser: false } } as any
