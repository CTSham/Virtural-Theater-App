import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Virtual Theater",
  description: "Indie films, virtual premieres, and secure streaming.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="container header">
          <div className="hstack">
            <Link className="brand" href="/">
              <strong>🎬 Virtual Theater</strong>
            </Link>
            <span className="badge">MVP</span>
          </div>
          <nav>
            <Link href="/browse">Browse</Link>
            <Link href="/dashboard">Filmmaker</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="container small opacity-70 padding-bottom-32">
          © {new Date().getFullYear()} Virtual Theater — Demo build for Code by
          Corey
        </footer>
      </body>
    </html>
  );
}
