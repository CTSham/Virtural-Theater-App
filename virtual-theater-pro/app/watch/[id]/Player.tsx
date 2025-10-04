'use client'
import Hls from 'hls.js'
import { useEffect, useRef, useState } from 'react'

export default function Player({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [ok, setOk] = useState(true)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    } else if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else setOk(false)
  }, [src])

  return ok ? <video ref={ref} className="player" controls playsInline /> : <div className="warning">HLS not supported.</div>
}
