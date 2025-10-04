# 🎬 Virtual Theater — Auth Starter (NextAuth + Stripe + Prisma)

Adds **user accounts** and a **My Library** page, and attaches purchases to a user.

## Features
- NextAuth (Credentials) + Prisma Adapter (database sessions)
- Register/Login pages (bcrypt password hashing)
- Stripe Checkout passes `userId` in metadata
- Stripe Webhook creates a `Purchase` linked to the user
- My Library page lists purchased/rented films + expiry
- HLS player + demo Mux URLs (swap for your assets)

## Quick Start
```bash
npm install
cp .env.example .env.local
# Fill AUTH_SECRET (use `openssl rand -base64 32`), Stripe keys, DATABASE_URL

docker run --name vt-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=virtual_theater -p 5432:5432 -d postgres:16

npm run prisma:generate
npm run prisma:migrate
npm run seed

npm run dev
# open http://localhost:3000
# Log in with demo: demo@virtual.theater / demo1234
```

## Stripe Webhook
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Paste signing secret into STRIPE_WEBHOOK_SECRET
```

## Notes
- For production, add OAuth providers (Google, GitHub) instead of Credentials-only.
- Use **Mux signed playback** for DRM-like protection; issue short-lived tokens per view session.
- Expand the schema for Reviews, Watchlists, and Filmmaker uploads.

Built for Code by Corey — ship it 🚀
