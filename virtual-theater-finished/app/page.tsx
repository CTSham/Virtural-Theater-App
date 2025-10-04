import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function Home() {
  const movie = await prisma.movie.findFirst({ orderBy: { createdAt: 'desc' } })
  if (!movie) return <div className="panel">No movies yet.</div>
  return (
    <div className="panel" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:20}}>
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div>
        <h1 style={{marginTop:0}}>Featured Premiere</h1>
        <h2 style={{margin:'4px 0'}}>{movie.title}</h2>
        <p className="small">{movie.runtimeMins} min • Release {movie.release}</p>
        <p>{movie.synopsis}</p>
        <div style={{display:'flex', gap:12}}>
          <Link href={`/movie/${movie.id}`} className="btn gold">View</Link>
          <Link href="/browse" className="btn">Browse</Link>
        </div>
      </div>
    </div>
  )
}
