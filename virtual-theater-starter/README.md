# 🎬 Virtual Theater — Starter (Next.js + TS)

Dark, cinema‑style MVP to showcase:
- Browse movies
- Movie detail with ticket options
- Mock checkout (localStorage)
- Watch page with HLS player (hls.js)
- Filmmaker dashboard (stub)

> **Important**: Streams in `/data/movies.json` are placeholders. Replace with real HLS URLs from **Mux** or AWS MediaConvert. Add DRM (Widevine/FairPlay) before any real distribution.

## 🚀 Quick Start

```bash
# 1) Install
npm install

# 2) Run dev
npm run dev

# 3) Open
http://localhost:3000
```

## 🔧 Replace with real services

- **Streaming**: Use **Mux** (recommended). Get playback IDs → drop HLS URLs into `data/movies.json` (`stream`, `trailer`).
- **Payments**: Replace the mock checkout in `app/checkout/page.tsx` with **Stripe Checkout**.
- **Auth**: Add NextAuth (or Auth.js) for user accounts and a real purchase table.
- **Database**: Migrate from JSON to Postgres (Prisma). Tables: `User`, `Movie`, `Purchase`.
- **Uploads** (Filmmaker): Direct upload to S3/R2, then asynchronously transcode to HLS via Mux/MediaConvert.

## 🗂️ Project Structure
```
app/
  page.tsx               # Featured + Trending
  browse/page.tsx
  movie/[id]/page.tsx    # Detail + buy/rent
  checkout/page.tsx      # Mock checkout (replace with Stripe)
  watch/[id]/page.tsx    # HLS player + timer
  watch/[id]/Player.tsx
  dashboard/page.tsx     # Filmmaker stub
data/
  movies.json            # Mock catalog
public/
  posters/               # Placeholder posters
```

## ✅ Roadmap (suggested)
1. Wire Stripe Checkout session (server route) + webhook → create `Purchase` in DB.
2. Integrate Mux: signed playback URLs + preview trailer.
3. Add accounts (NextAuth) + library page for purchased films.
4. Filmmaker uploads → create asset → wait for ready → publish.
5. Reviews, watchlists, search, and notifications.

---

Built for **Code by Corey** as a legal, ethical alternative to early-access film streaming.
