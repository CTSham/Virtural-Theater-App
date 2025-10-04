import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Home() {
  const movie = await prisma.movie.findFirst({
    orderBy: { createdAt: "desc" },
  });
  if (!movie) return <div className="panel">No movies yet.</div>;
  return (
    <div className="panel grid-featured">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div>
        <h1 className="margin-top-0">Featured Premiere</h1>
        <h2 className="margin-4-0">{movie.title}</h2>
        <p className="small">
          {movie.runtimeMins} min • Release {movie.release}
        </p>
        <p>{movie.synopsis}</p>
        <div className="flex-gap-12">
          <Link href={`/movie/${movie.id}`} className="btn gold">
            Buy Ticket ${(movie.priceRent / 100).toFixed(2)}
          </Link>
          <Link href="/browse" className="btn">
            Browse
          </Link>
        </div>
      </div>
    </div>
  );
}
