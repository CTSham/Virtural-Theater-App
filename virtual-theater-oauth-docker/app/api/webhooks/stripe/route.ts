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
    const { movieId, purchaseType, userId } = session.metadata || {}
    if (movieId && userId) {
      const expiresAt = purchaseType === 'rent' ? new Date(Date.now() + 48*3600*1000) : null
      await prisma.purchase.create({ data: { userId, movieId, type: purchaseType === 'buy' ? 'BUY' : 'RENT', expiresAt } })
    }
  }
  return NextResponse.json({ received: true })
}
