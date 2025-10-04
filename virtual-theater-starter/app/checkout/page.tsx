"use client";
import { useSearchParams, useRouter } from "next/navigation";
import movies from "@/data/movies.json";
import { useMemo } from "react";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("movie") || "";
  const type = params.get("type") || "rent";

  const movie = useMemo(() => (movies as any[]).find((m) => m.id === id), [id]);
  if (!movie) return <div className="warning">Movie not found.</div>;

  const price = type === "buy" ? movie.priceBuy : movie.priceRent;

  function fakePay() {
    // MVP: mark as purchased in localStorage (client-only demo)
    const key = "purchases";
    const existing = JSON.parse(localStorage.getItem(key) || "{}");
    existing[id] = {
      type,
      expiresAt: type === "rent" ? Date.now() + 48 * 3600 * 1000 : null,
    };
    localStorage.setItem(key, JSON.stringify(existing));
    router.push(`/watch/${id}`);
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
      <div className="panel">
        <h1>Checkout</h1>
        <p>
          You are purchasing: <strong>{movie.title}</strong>
        </p>
        <p>
          Ticket:{" "}
          <strong>{type === "buy" ? "Buy Forever" : "48 hr Rental"}</strong>
        </p>
        <hr className="sep" />
        <div className="vstack">
          <input className="input" placeholder="Card number (demo)" />
          <div className="hstack">
            <input className="input" placeholder="MM/YY" />
            <input className="input" placeholder="CVC" />
          </div>
          <button className="btn gold" onClick={fakePay}>
            Pay ${price.toFixed(2)}
          </button>
          <div className="small" style={{ opacity: 0.8 }}>
            Demo only. Replace with Stripe Checkout in production.
          </div>
        </div>
      </div>
      <div className="panel vstack">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div>
          <strong>{movie.title}</strong>
        </div>
        <div className="small">
          {movie.runtimeMins} min • {movie.release}
        </div>
      </div>
    </div>
  );
}
