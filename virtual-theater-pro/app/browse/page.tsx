import Link from 'next/link'
import movies from '@/data/movies.json'

export default function Browse() {
  return (
    <div>
      <h1>Browse</h1>
      <div className="grid cards">
        {(movies as any[]).map(m => (
                  {movies.map((m) => (
          <Link key={m.id} href={`/movie/${m.id}`} className="panel padding-12">
            <img src={m.poster} className="movie-poster" alt={m.title} />
            <div className="font-weight-600">{m.title}</div>
            <div className="small">{m.runtimeMins} min • {m.release}</div>
          </Link>
        ))}
        ))}
      </div>
    </div>
  )
}
