# 🎬 Virtual Theater — Complete

All-in-one starter with:
- **Auth (NextAuth + Prisma)** with roles (USER, FILMMAKER, ADMIN)
- **Stripe Checkout + Webhook** → purchases tied to user with rental expiry
- **Mux**: direct uploads, webhook stub, **signed playback** endpoint
- **Filmmaker Upload** page to create a film and request direct-upload URLs
- **Reviews & Watchlists**
- **Admin** dashboard (basic)
- **Library** & **Watch** with short-lived signed URLs

## Setup
```bash
npm install
cp .env.example .env.local    # fill keys
docker run --name vt-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=virtual_theater -p 5432:5432 -d postgres:16
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
# http://localhost:3000
# Admin: admin@virtual.theater / admin1234
# User:  demo@virtual.theater  / demo1234
```

## Stripe (test mode)
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Put signing secret in STRIPE_WEBHOOK_SECRET
```

## Mux
- Put **MUX_TOKEN_ID**, **MUX_TOKEN_SECRET**, **MUX_SIGNING_KEY_ID**, **MUX_SIGNING_KEY_PRIVATE** in `.env.local`.
- **Direct uploads**: Use `/filmmaker/upload` → creates film and returns two upload URLs.
  - Upload files via cURL or a simple uploader to those URLs.
  - When assets are `ready`, fetch their **playback IDs** from Mux and set them on the Movie (extend Admin or create a route to update).
- **Signed playback**: `/api/sign-playback?movieId=...&preview=1` returns a short-lived HLS URL.

## Extend
- Verify Mux webhook signatures and wire `passthrough` to auto-link assets to movies.
- Add UI for setting `muxPlaybackId`/`trailerMuxPlaybackId` on a film after upload.
- Expand Admin with pricing controls, analytics, moderation.
- Add rate-limits and content policies for reviews.

---

Built for **Code by Corey**. Ship it 🚀
