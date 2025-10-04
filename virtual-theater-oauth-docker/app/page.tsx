import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/db'

export default async function Home() {
  const movie = await prisma.movie.findFirst({ orderBy: { createdAt: 'desc' } })
  return (
    <div className="panel" style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:20}}>
      <Image src="/branding/hero-poster.jpg" alt="Hero" width={800} height={600} className="movie-poster" />
      <div>
        <h1 style={{marginTop:0}}>Premieres. Anywhere.</h1>
        <p className="small">OAuth sign-in, secure streaming, containerized deploy.</p>
        <div style={{display:'flex', gap:12}}>
          <Link href="/browse" className="btn gold">Browse Films</Link>
          <Link href="/library" className="btn">My Library</Link>
        </div>
      </div>
    </div>
  )
}
