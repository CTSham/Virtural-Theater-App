import Link from 'next/link'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'

export default async function MoviePage({ params }: { params: { id: string } }) {
  const session = await auth()
  const userId = session?.user?.id || ''
  const movie = await prisma.movie.findUnique({ where: { id: params.id } })
  if (!movie) return <div className="panel">Not found</div>

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1.2fr', gap:24}}>
      <div className="panel">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="small">Mux Playback: {movie.muxPlaybackId ? 'Ready' : 'Not ready'}</div>
      </div>
      <div>
        <h1>{movie.title}</h1>
        <div className="small">{movie.runtimeMins} min • Release {movie.release}</div>
        <p>{movie.synopsis}</p>
        <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
          <form action={`/api/checkout`} method="POST">
            <input type="hidden" name="movieId" value={movie.id} />
            <input type="hidden" name="purchaseType" value="rent" />
            <input type="hidden" name="userId" value={userId} />
            <button className="btn gold" type="submit">Rent 48 hrs ${(movie.priceRent/100).toFixed(2)}</button>
          </form>
          <form action={`/api/checkout`} method="POST">
            <input type="hidden" name="movieId" value={movie.id} />
            <input type="hidden" name="purchaseType" value="buy" />
            <input type="hidden" name="userId" value={userId} />
            <button className="btn" type="submit">Buy ${(movie.priceBuy/100).toFixed(2)}</button>
          </form>
          {movie.muxPlaybackId && <a className="btn" href={`/watch/${movie.id}`}>Watch</a>}
        </div>
      </div>
    </div>
  )
}
