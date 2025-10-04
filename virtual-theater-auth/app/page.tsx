import Link from "next/link";
import movies from "@/data/movies.json";

export default function Home() {
  const f = (movies as any[])[0];
  return (
    <div className="panel grid-featured">
      <img src={f.poster} alt={f.title} className="movie-poster" />
      <div>
        <h1 className="margin-top-0">Featured Premiere</h1>
        <h2 className="margin-4-0">{f.title}</h2>
        <p className="small">
          {f.runtimeMins} min • Release {f.release}
        </p>
        <p>{f.synopsis}</p>
        <div className="flex-gap-12">
          <Link href={`/movie/${f.id}`} className="btn gold">
            Buy Ticket ${(f.priceRent / 100).toFixed(2)}
          </Link>
          <Link href="/browse" className="btn">
            Browse
          </Link>
        </div>
      </div>
    </div>
  );
}
