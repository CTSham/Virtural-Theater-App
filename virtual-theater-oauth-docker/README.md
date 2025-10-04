# 🎬 Virtual Theater — Branded + OAuth + Docker

A polished starter with:
- Custom branding (logo + hero)
- **OAuth sign-in** (Google + Apple) + Credentials
- **Dockerfile** and **docker-compose** (Next app, Postgres, MailDev)
- Prisma, Stripe Checkout (webhook), Mux signed playback (stubs)

## Quick start (Docker)
```bash
cp .env.example .env
# edit .env with OAuth/Stripe/Mux values (for local docker, DB URL is set in compose)
docker compose up --build
# open http://localhost:3000
```

Init DB (in another terminal):
```bash
docker compose exec app npx prisma generate
docker compose exec app npx prisma migrate dev --name init
docker compose exec app npm run seed
```

## OAuth setup
- **Google**: Create OAuth credentials; add Authorized redirect URI:
  `http://localhost:3000/api/auth/callback/google`
- **Apple**: Configure a Services ID and client secret (JWT); redirect URI:
  `http://localhost:3000/api/auth/callback/apple`
- Put client IDs and secrets into `.env` (or compose env).

## Notes
- For receipts, point SMTP env vars at a real SMTP or use the **MailDev** web UI at `http://localhost:1080`.
- Mux & Stripe envs are placeholders; wire your keys to test end-to-end.
- This repo is a thin, branded layer. For full features (uploads, admin analytics, reviews), combine with the “finished” build you already have.

Happy shipping 🚀
