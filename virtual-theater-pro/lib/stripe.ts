import Stripe from 'stripe'
let _stripe: Stripe | null = null
export function getStripe() {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' })
  return _stripe!
}
