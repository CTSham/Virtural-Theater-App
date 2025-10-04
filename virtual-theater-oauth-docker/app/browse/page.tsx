import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function Browse() {
  const movies = await prisma.movie.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <h1>Browse</h1>
      <div className="grid cards">
        {movies.map(m => (
          <Link key={m.id} href={`/movie/${m.id}`} className="panel padding-12">
            <img src={m.poster} alt={m.title} className="movie-poster" />
            <div className="font-weight-600">{m.title}</div>
            <div className="small">{m.runtimeMins} min • {m.release}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
