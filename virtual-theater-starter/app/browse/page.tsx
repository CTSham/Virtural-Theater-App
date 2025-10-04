import Link from 'next/link'
import movies from '@/data/movies.json'

export const metadata = { title: 'Browse • Virtual Theater' }

export default function Browse() {
  return (
    <div className="vstack">
      <h1>Browse</h1>
      <div className="grid cards">
        {(movies as any[]).map(m => (
          <Link key={m.id} href={`/movie/${m.id}`} className="panel vstack" style={{padding:12}}>
            <img src={m.poster} alt={m.title} className="movie-poster" />
            <div>
              <div style={{fontWeight:600}}>{m.title}</div>
              <div className="small">{m.runtimeMins} min • {m.release}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
