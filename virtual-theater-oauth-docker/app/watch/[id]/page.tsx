'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Player from './Player'

export default function WatchPage() {
  const { id } = useParams<{ id: string }>()
  const [url, setUrl] = useState<string>('')
  useEffect(() => { (async ()=>{ const res = await fetch(`/api/sign-playback?movieId=${id}`); const d = await res.json(); setUrl(d.url||'') })() }, [id])
  if (!url) return <div className="panel">Preparing playback...</div>
  return (<div><h1>Now Playing</h1><Player src={url} /><div className="small">Signed link — expires soon.</div></div>)
}
