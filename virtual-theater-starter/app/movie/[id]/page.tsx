import Link from "next/link";
import movies from "@/data/movies.json";

type Props = { params: { id: string } };

export default function MoviePage({ params }: Props) {
  const movie = (movies as any[]).find((m) => m.id === params.id);
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1.2fr", gap: 24 }}>
      <div className="panel vstack">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="small">⭐ {movie.rating.toFixed(1)}</div>
      </div>
      <div className="vstack">
        <h1 style={{ margin: "0 0 4px" }}>{movie.title}</h1>
        <div className="small">
          {movie.runtimeMins} min • Release {movie.release}
        </div>
        <p>{movie.synopsis}</p>
        <div className="hstack">
          <Link
            href={`/checkout?movie=${movie.id}&type=rent`}
            className="btn gold"
          >
            Rent 48 hrs ${movie.priceRent.toFixed(2)}
          </Link>
          <Link
            href={`/checkout?movie=${movie.id}&type=buy`}
            className="btn teal"
          >
            Buy ${movie.priceBuy.toFixed(2)}
          </Link>
          <Link href={`/watch/${movie.id}?preview=1`} className="btn">
            Play Trailer
          </Link>
        </div>
        <hr className="sep" />
        <div className="small">Add reviews later • This is MVP text.</div>
      </div>
    </div>
  );
}
