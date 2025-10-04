"use client";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

export default function Player({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else {
      setSupported(false);
    }
  }, [src]);

  if (!supported) {
    return (
      <div className="warning">
        Your browser does not support HLS playback. Try a modern browser.
      </div>
    );
  }

  return <video ref={videoRef} className="player" controls playsInline />;
}
