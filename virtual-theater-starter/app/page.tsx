import Link from "next/link";
import movies from "@/data/movies.json";

export default function Home() {
  const featured = (movies as any[])[0];
  return (
    <div className="vstack">
      <section className="panel vstack">
        <h1 style={{ fontSize: 28, margin: 0 }}>Featured Premiere</h1>
        <div
          className="grid"
          style={{ gridTemplateColumns: "1.2fr 1fr", gap: 20 }}
        >
          <img
            src={featured.poster}
            alt={featured.title}
            className="movie-poster"
          />
          <div className="vstack">
            <h2 style={{ margin: "4px 0 0" }}>{featured.title}</h2>
            <p className="small">
              {featured.runtimeMins} min • Release {featured.release}
            </p>
            <p>{featured.synopsis}</p>
            <div className="hstack">
              <Link href={`/movie/${featured.id}`} className="btn gold">
                Buy Ticket ${featured.priceRent.toFixed(2)}
              </Link>
              <Link href="/browse" className="btn">
                Browse All
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="section-title">Trending Now</h3>
        <div className="grid cards">
          {(movies as any[]).map((m) => (
            <Link
              key={m.id}
              href={`/movie/${m.id}`}
              className="panel vstack"
              style={{ padding: 12 }}
            >
              <img src={m.poster} alt={m.title} className="movie-poster" />
              <div>
                <div style={{ fontWeight: 600 }}>{m.title}</div>
                <div className="small">
                  {m.runtimeMins} min • {m.release}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
