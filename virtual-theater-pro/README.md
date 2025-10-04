# 🎬 Virtual Theater — Pro Starter (Stripe + Mux + Prisma)

Production-leaning Next.js starter that wires the core pieces you'll need:

- **Stripe Checkout** route (`/api/checkout`) with redirect to hosted checkout
- **Stripe Webhook** (`/api/webhooks/stripe`) to record purchases (Prisma)
- **Prisma** schema for `User`, `Movie`, `Purchase`
- **Mux** helper for future asset ingest + signed playback
- **HLS player** with `hls.js` on the Watch page
- **Demo data** in `data/movies.json` (+ `scripts/seed.mjs`)

> ⚠️ For security/compliance, add real Auth (e.g., NextAuth) to tie purchases to a user ID before going live.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your keys (Stripe, webhook secret, Mux, DATABASE_URL)

# Start Postgres locally (Docker example)
docker run --name vt-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=virtual_theater -p 5432:5432 -d postgres:16

# Prisma
npm run prisma:generate
npm run prisma:migrate
npm run seed

# Dev
npm run dev
```

## Stripe Setup

1. Create two products in Stripe (optional) or rely on inline price_data (already configured).
2. Set `STRIPE_SECRET_KEY` in `.env.local`.
3. Run the dev server and start a webhook tunnel:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Mux Setup (Playback)

- Replace the demo `stream` & `trailer` URLs in `data/movies.json` with real Mux playback URLs.
- For protected content, enable **signed playback** and issue signed tokens server-side.
- `lib/mux.ts` includes a helper and a placeholder for creating assets from a direct upload URL.

## Roadmap
- Add **NextAuth** and connect `Purchase.userId` on webhook completion.
- Signed Mux URLs per user/session.
- Filmmaker upload flow: direct-to-storage → create Mux asset → wait for `ready` webhook → publish.
- Library page showing a user's purchased films and remaining rental time.
- Reviews and watchlists with rate-limiting + moderation.

---

Built for Code by Corey — go ship it 🚀
