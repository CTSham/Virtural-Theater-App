import "./globals.css";
import Link from "next/link";
import AuthStatus from "@/components/AuthStatus";

export const metadata = {
  title: "Virtual Theater — Finished",
  description: "Fully-featured indie premieres.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="container header">
          <div>
            <Link href="/">
              <strong>🎬 Virtual Theater</strong>
            </Link>
          </div>
          <nav className="flex-gap-12-center">
            <Link href="/browse">Browse</Link>
            <Link href="/library">My Library</Link>
            <Link href="/filmmaker">Filmmaker</Link>
            <AuthStatus />
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="container small opacity-70 padding-bottom-32">
          © {new Date().getFullYear()} Virtual Theater — Finished
        </footer>
      </body>
    </html>
  );
}
