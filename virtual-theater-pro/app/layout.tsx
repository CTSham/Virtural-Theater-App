import './globals.css'
import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Virtual Theater Pro',
  description: 'Indie films, virtual premieres, secure streaming with Stripe + Mux.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="container header">
          <div><Link href="/"><strong>🎬 Virtual Theater</strong></Link></div>
          <nav style={{display:'flex', gap:12}}>
            <Link href="/browse">Browse</Link>
            <Link href="/dashboard">Filmmaker</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="container small" style={{opacity:.7, paddingBottom: 32}}>
          © {new Date().getFullYear()} Virtual Theater — Pro starter
        </footer>
      </body>
    </html>
  )
}
