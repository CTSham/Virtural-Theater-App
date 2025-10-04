'use client'
import { useParams, useSearchParams } from 'next/navigation'
import movies from '@/data/movies.json'
import Player from './Player'
import { useMemo } from 'react'

export default function WatchPage() {
  const { id } = useParams<{ id: string }>()
  const preview = useSearchParams().get('preview')
  const movie = useMemo(() => (movies as any[]).find(m => m.id === id), [id])
  if (!movie) return <div>Not found</div>
  const src = preview ? movie.trailerUrl : movie.streamUrl
  return (
    <div>
      <h1>{movie.title}</h1>
      <Player src={src} />
      <div className="small">Demo playback URL — use Mux signed playback for protection.</div>
    </div>
  )
}
