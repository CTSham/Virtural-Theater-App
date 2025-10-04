import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Virtual Theater",
  description: "The page you're looking for could not be found.",
};

export default function NotFound() {
  return (
    <div
      className="text-center"
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <h1
        style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        404
      </h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem", opacity: 0.8 }}>
        Page Not Found
      </h2>
      <p style={{ marginBottom: "2rem", opacity: 0.7 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "white",
          textDecoration: "none",
          borderRadius: "0.5rem",
          fontWeight: "500",
        }}
      >
        Return Home
      </a>
    </div>
  );
}
