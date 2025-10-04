# 🎬 Virtual Theater — Finished

## New in this build
- **Admin → Set Playback IDs** page to paste Mux playback IDs on each film.
- **Mux webhook verification** with `MUX_WEBHOOK_SECRET` and **auto-link** assets via `passthrough` (feature/trailer).
- **Analytics** on Admin page: revenue, ticket count, simple SVG bar chart of sales by movie.
- **Email receipts** on Stripe webhook using SMTP env vars.

## Upload & auto-link workflow
1) Create film (Filmmaker → Upload) to add movie to DB.
2) Request direct upload URL via:
   ```bash
   curl -X POST http://localhost:3000/api/mux/create-upload -H "Content-Type: application/json" -d '{"movieId":"<ID>","kind":"feature"}'
   curl -X POST http://localhost:3000/api/mux/create-upload -H "Content-Type: application/json" -d '{"movieId":"<ID>","kind":"trailer"}'
   ```
3) Upload files to returned URLs. When Mux processes them, it will call your webhook with `passthrough` → movie is auto-updated with the right playback ID.
4) If needed, use **Admin → Set Playback IDs** to paste manually.

## Email receipts
Set SMTP env vars. If unset, receipts are skipped automatically.

## Setup (same as before)
- Fill `.env.local` with Stripe, Mux, DB, Auth, and SMTP (optional).
- Start Postgres, migrate, seed, run dev.
- Start Stripe webhook listener.

Go ship it! 🚀
