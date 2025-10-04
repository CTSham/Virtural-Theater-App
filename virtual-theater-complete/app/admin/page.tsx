import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export default async function Admin() {
  const session = await auth()
  const me = session?.user?.email
  const user = me ? await prisma.user.findUnique({ where: { email: me } }) : null
  if (user?.role !== 'ADMIN') return <div className="panel">Admins only.</div>

  const movies = await prisma.movie.findMany({ orderBy: { createdAt: 'desc' } })
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 20 })

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:16}}>
      <div className="panel">
        <h2>Movies</h2>
        <table className="table">
          <thead><tr><th>Title</th><th>Mux</th><th>Price</th></tr></thead>
          <tbody>
            {movies.map(m => (
              <tr key={m.id}><td>{m.title}</td><td>{m.muxPlaybackId ? 'Ready' : 'Processing'}</td><td>${(m.priceRent/100).toFixed(2)} / ${(m.priceBuy/100).toFixed(2)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <h2>Users</h2>
        <table className="table">
          <thead><tr><th>Email</th><th>Role</th></tr></thead>
          <tbody>
            {users.map(u => (<tr key={u.id}><td>{u.email}</td><td>{u.role}</td></tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
