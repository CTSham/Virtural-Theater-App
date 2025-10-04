import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Virtual Theater Pro",
  description:
    "Indie films, virtual premieres, secure streaming with Stripe + Mux.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="container header">
          <div>
            <Link href="/">
              <strong>🎬 Virtual Theater Pro</strong>
            </Link>
          </div>
          <nav className="flex-gap-12">
            <Link href="/browse">Browse</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/library">My Library</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="container small opacity-70 padding-bottom-32">
          © {new Date().getFullYear()} Virtual Theater Pro
        </footer>
      </body>
    </html>
  );
}
