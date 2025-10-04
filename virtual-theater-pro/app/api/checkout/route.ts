import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import movies from '@/data/movies.json'

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const movieId = body.get('movieId') as string
  const purchaseType = body.get('purchaseType') as 'rent' | 'buy'

  const movie = (movies as any[]).find(m => m.id === movieId)
  if (!movie) return NextResponse.json({ error: 'Movie not found' }, { status: 400 })

  const stripe = getStripe()

  const price = purchaseType === 'buy' ? movie.priceBuy : movie.priceRent

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: price,
        product_data: {
          name: `${movie.title} — ${purchaseType === 'buy' ? 'Buy' : '48h Rental'}`,
          metadata: { movieId, purchaseType }
        }
      },
      quantity: 1
    }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/watch/${movie.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/movie/${movie.id}`,
    metadata: { movieId, purchaseType }
  })

  return NextResponse.redirect(session.url!, { status: 303 })
}
