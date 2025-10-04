import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SetPlayback({ params }: { params: { id: string } }) {
  const session = await auth()
  const me = session?.user?.email
  const user = me ? await prisma.user.findUnique({ where: { email: me } }) : null
  if (user?.role !== 'ADMIN') return <div className="panel">Admins only.</div>

  const movie = await prisma.movie.findUnique({ where: { id: params.id } })
  if (!movie) return <div className="panel">Movie not found.</div>

  return (
    <div className="panel" style={{maxWidth:560}}>
      <h1>Set Playback IDs</h1>
      <div className="small">Paste Mux playback IDs after your assets finish processing.</div>
      <form action="/api/admin/set-playback" method="POST">
        <input type="hidden" name="movieId" value={movie.id} />
        <div style={{height:8}}/>
        <input className="input" name="muxPlaybackId" defaultValue={movie.muxPlaybackId || ''} placeholder="Feature Playback ID" />
        <div style={{height:8}}/>
        <input className="input" name="trailerMuxPlaybackId" defaultValue={movie.trailerMuxPlaybackId || ''} placeholder="Trailer Playback ID" />
        <div style={{height:12}}/>
        <button className="btn gold" type="submit">Save</button>
      </form>
    </div>
  )
}
