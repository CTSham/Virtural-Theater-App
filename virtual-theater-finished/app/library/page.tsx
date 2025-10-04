import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export default async function Library() {
  const session = await auth()
  if (!session?.user?.id) return <div className="panel">Please <Link href="/login">log in</Link> to see your library.</div>
  const purchases = await prisma.purchase.findMany({ where: { userId: session.user.id }, include: { movie: true }, orderBy:{ createdAt:'desc' } })
  if (!purchases.length) return <div className="panel">No purchases yet.</div>
  return (
    <div>
      <h1>My Library</h1>
      <div className="grid cards">
        {purchases.map((p: any) => (
          <Link key={p.id} href={`/watch/${p.movieId}`} className="panel padding-12">
            <img src={p.movie.poster} className="movie-poster" alt={p.movie.title} />
            <div className="font-weight-600">{p.movie.title}</div>
            <div className="small">{p.type} • {p.expiresAt ? `Expires ${p.expiresAt.toISOString().slice(0,10)}` : 'Yours to keep'}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
