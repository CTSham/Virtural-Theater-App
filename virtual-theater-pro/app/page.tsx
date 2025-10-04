import Link from 'next/link'
import movies from '@/data/movies.json'

export default function Home() {
  const f = (movies as any[])[0]
  return (
    <div className="panel" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:20}}>
      <img src={f.poster} alt={f.title} className="movie-poster" />
      <div>
        <h1 style={{marginTop:0}}>Featured Premiere</h1>
        <h2 style={{margin:'4px 0'}}>{f.title}</h2>
        <p className="small">{f.runtimeMins} min • Release {f.release}</p>
        <p>{f.synopsis}</p>
        <div style={{display:'flex', gap:12}}>
          <Link href={`/movie/${f.id}`} className="btn gold">Buy Ticket ${(f.priceRent/100).toFixed(2)}</Link>
          <Link href="/browse" className="btn">Browse</Link>
        </div>
      </div>
    </div>
  )
}
