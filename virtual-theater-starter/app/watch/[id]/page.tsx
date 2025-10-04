"use client";
import { useParams, useSearchParams } from "next/navigation";
import movies from "@/data/movies.json";
import Player from "./Player";
import { useEffect, useMemo, useState } from "react";

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const params = useSearchParams();
  const preview = params.get("preview");

  const movie = useMemo(() => (movies as any[]).find((m) => m.id === id), [id]);

  const [allowed, setAllowed] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  useEffect(() => {
    if (preview) {
      setAllowed(true);
      return;
    }
    const key = "purchases";
    const existing = JSON.parse(localStorage.getItem(key) || "{}");
    const entry = existing[id as string];
    if (!entry) return;
    if (entry.type === "buy") {
      setAllowed(true);
      return;
    }
    if (entry.expiresAt && Date.now() < entry.expiresAt) {
      setAllowed(true);
      setExpiresAt(entry.expiresAt);
      return;
    }
  }, [id, preview]);

  if (!movie) return <div>Movie not found.</div>;
  if (!allowed)
    return (
      <div className="warning">
        You do not have access. Please purchase a ticket.
      </div>
    );

  const src = preview ? movie.trailer : movie.stream;

  return (
    <div className="vstack">
      <h1 style={{ margin: "0 0 8px" }}>{movie.title}</h1>
      {expiresAt && (
        <div className="small">
          Time remaining:{" "}
          {Math.max(0, Math.floor((expiresAt - Date.now()) / 1000 / 60 / 60))}{" "}
          hrs
        </div>
      )}
      <Player src={src} />
      <div className="small">
        Demo stream placeholder. Replace with Mux/Widevine DRM for production.
      </div>
    </div>
  );
}
