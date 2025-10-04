import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import nodemailer from 'nodemailer'

async function sendReceipt(email: string, title: string, type: string, amountCents: number) {
  const host = process.env.SMTP_HOST, user = process.env.SMTP_USER, pass = process.env.SMTP_PASS, port = Number(process.env.SMTP_PORT || 587)
  const from = process.env.SMTP_FROM || 'no-reply@example.com'
  if (!host || !user || !pass) return
  const transporter = nodemailer.createTransport({ host, port, secure: false, auth: { user, pass } })
  await transporter.sendMail({
    from, to: email,
    subject: `Your ${type === 'BUY' ? 'Purchase' : 'Rental'} — ${title}`,
    html: `<p>Thanks for your ${type === 'BUY' ? 'purchase' : 'rental'} of <strong>${title}</strong>.</p>
           <p>Amount: $${(amountCents/100).toFixed(2)}</p>
           <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/library">Go to My Library</a></p>`
  })
}

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
    const userId = meta.userId as string

    if (movieId && userId) {
      const movie = await prisma.movie.findUnique({ where: { id: movieId } })
      if (movie) {
        await prisma.purchase.create({
          data: {
            userId,
            movieId,
            type: purchaseType === 'buy' ? 'BUY' : 'RENT',
            expiresAt: purchaseType === 'rent' ? new Date(Date.now() + 48 * 3600 * 1000) : null
          }
        })
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if (user?.email) {
          const amount = purchaseType === 'buy' ? movie.priceBuy : movie.priceRent
          await sendReceipt(user.email, movie.title, purchaseType === 'buy' ? 'BUY' : 'RENT', amount)
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}

export const config = { api: { bodyParser: false } } as any
