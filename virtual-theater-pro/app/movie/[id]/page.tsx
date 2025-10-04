import Link from 'next/link'
import movies from '@/data/movies.json'

type Props = { params: { id: string } }

export default function MoviePage({ params }: Props) {
  const movie = (movies as any[]).find(m => m.id === params.id)
  if (!movie) return <div>Not found</div>
  return (
    <div className="grid grid-featured">
      <div className="panel">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="small">⭐ {movie.rating.toFixed(1)}</div>
      </div>
      <div>
        <h1>{movie.title}</h1>
        <div className="small">{movie.runtimeMins} min • Release {movie.release}</div>
        <p>{movie.synopsis}</p>
        <div className="flex-wrap-gap-12">
          <form action={`/api/checkout`} method="POST">
            <input type="hidden" name="movieId" value={movie.id} />
            <input type="hidden" name="purchaseType" value="rent" />
            <button className="btn gold" type="submit">Rent 48 hrs ${(movie.priceRent/100).toFixed(2)}</button>
          </form>
          <form action={`/api/checkout`} method="POST">
            <input type="hidden" name="movieId" value={movie.id} />
            <input type="hidden" name="purchaseType" value="buy" />
            <button className="btn" type="submit">Buy ${(movie.priceBuy/100).toFixed(2)}</button>
          </form>
          <a className="btn" href={`/watch/${movie.id}?preview=1`}>Play Trailer</a>
        </div>
      </div>
    </div>
  )
}
