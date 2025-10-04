import Link from 'next/link'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { addReview, toggleWatchlist } from './actions'

type Props = { params: { id: string } }

export default async function MoviePage({ params }: Props) {
  const session = await auth()
  const movie = await prisma.movie.findUnique({
    where: { id: params.id },
    include: { reviews: { include: { user: true }, orderBy: { createdAt: 'desc' } } }
  })
  if (!movie) return <div>Not found</div>
  const isLoggedIn = !!session?.user?.id

  return (
    <div className="grid grid-featured">
      <div className="panel">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="small">Mux Playback: {movie.muxPlaybackId ? 'Ready' : 'Not ready'}</div>
      </div>
      <div>
        <h1>{movie.title}</h1>
        <div className="small">{movie.runtimeMins} min • Release {movie.release}</div>
        <p>{movie.synopsis}</p>

        <div className="flex-wrap-gap-12">
          <form action={`/api/checkout`} method="POST">
            <input type="hidden" name="movieId" value={movie.id} />
            <input type="hidden" name="purchaseType" value="rent" />
            <input type="hidden" name="userId" value={session?.user?.id || ''} />
            <button className="btn gold" type="submit">Rent 48 hrs ${(movie.priceRent/100).toFixed(2)}</button>
          </form>
          <form action={`/api/checkout`} method="POST">
            <input type="hidden" name="movieId" value={movie.id} />
            <input type="hidden" name="purchaseType" value="buy" />
            <input type="hidden" name="userId" value={session?.user?.id || ''} />
            <button className="btn" type="submit">Buy ${(movie.priceBuy/100).toFixed(2)}</button>
          </form>
          {movie.trailerMuxPlaybackId && <a className="btn" href={`/watch/${movie.id}?preview=1`}>Play Trailer</a>}
          {movie.muxPlaybackId && <a className="btn" href={`/watch/${movie.id}`}>Watch</a>}
          {isLoggedIn && (
            <form action={async ()=>{ 'use server'; await toggleWatchlist(movie.id) }}>
              <button className="btn" type="submit">★ Watchlist</button>
            </form>
          )}
        </div>

        <hr className="sep" />
        <h3>Reviews</h3>
        <div className="flex-gap-10">
          {movie.reviews.map(r => (
            <div key={r.id} className="panel">
              <div className="small">{r.user.email} • ⭐ {r.rating}/5</div>
              <div>{r.content}</div>
            </div>
          ))}
        </div>
        {isLoggedIn && (
          <form action={async (formData: FormData) => {
            'use server'
            const rating = Number(formData.get('rating'))
            const content = String(formData.get('content') || '')
            await addReview(movie.id, rating, content)
          }} className="panel margin-top-12">
            <div className="small">Add/Update your review</div>
            <input name="rating" className="input" placeholder="Rating 1-5" />
            <div className="spacer-8"/>
            <textarea name="content" className="input" placeholder="Your thoughts..." rows={3 as any}></textarea>
            <div className="spacer-8"/>
            <button className="btn gold" type="submit">Save Review</button>
          </form>
        )}
      </div>
    </div>
  )
}
