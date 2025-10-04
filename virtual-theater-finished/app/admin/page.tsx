import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function Admin() {
  const session = await auth()
  const me = session?.user?.email
  const user = me ? await prisma.user.findUnique({ where: { email: me } }) : null
  if (user?.role !== 'ADMIN') return <div className="panel">Admins only.</div>

  const movies = await prisma.movie.findMany({ orderBy: { createdAt: 'desc' } })
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 20 })
  const purchases = await prisma.purchase.findMany({ include: { movie: true } })

  const revenue = purchases.reduce((sum, p) => sum + (p.type === 'BUY' ? p.movie.priceBuy : p.movie.priceRent), 0)
  const byMovie: Record<string, number> = {}
  purchases.forEach(p => { byMovie[p.movie.title] = (byMovie[p.movie.title] || 0) + 1 })

  const chartBars = Object.entries(byMovie).map(([title, count], i) => {
    const height = Math.min(120, count * 10)
    const x = 20 + i * 60
    const y = 140 - height
    return `<rect x="${x}" y="${y}" width="40" height="${height}" rx="6" ry="6" />` +
           `<text x="${x+20}" y="160" font-size="10" text-anchor="middle">${title.slice(0,8)}</text>` +
           `<text x="${x+20}" y="${y-4}" font-size="10" text-anchor="middle">${count}</text>`
  }).join('')

  return (
    <div className="grid grid-admin">
      <div className="panel">
        <h2>Movies</h2>
        <table className="table">
          <thead><tr><th>Title</th><th>Mux</th><th>Price</th><th>Set IDs</th></tr></thead>
          <tbody>
            {movies.map(m => (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.muxPlaybackId ? 'Ready' : 'Processing'}</td>
                <td>${(m.priceRent/100).toFixed(2)} / ${(m.priceBuy/100).toFixed(2)}</td>
                <td><Link href={`/admin/set-playback/${m.id}`}>Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel">
        <h2>Analytics</h2>
        <div className="small">Revenue: ${(revenue/100).toFixed(2)} • Tickets: {purchases.length}</div>
        <svg width="400" height="180" viewBox="0 0 400 180" style={{border:'1px solid #2a2b33', borderRadius:8, background:'#0f1013'}} dangerouslySetInnerHTML={{__html: `<g fill='#9be9df'>${chartBars}</g>`}} />
        <h3 className="margin-top-16">Users</h3>
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
